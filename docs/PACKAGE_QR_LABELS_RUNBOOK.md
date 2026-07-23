# Package QR labels and warehouse printing

## Operational model

`quantity` is the number of items in a goods record. `packageCount` is the number of physical cartons, bags, or crates. Every physical package has its own immutable `GoodsPackage`, active `PackageLabel`, human-readable package code, and QR identity.

The QR payload is intentionally small: `CLX1:<label UUID>`. It contains no client phone, payment, value, container, AWB, or cargo-bag data. Scanning resolves current authorized information from the API. Replacing a damaged label revokes the old UUID and creates the next label version.

SEA packages can only enter a SEA container. AIR packages can enter an AWB loose or enter a cargo bag belonging to that AWB. All packages belonging to one goods record must use one sea container or one AWB; AIR packages may be distributed across bags within that same AWB.

## Printing flow

1. The admin selects one or more active package labels and a configured printer.
2. The API creates an idempotent `LabelPrintJob`, validates reprint reasons, renders ZPL and a system-print snapshot, and records the exact output checksum.
3. Android changes the job to `SENDING` and sends all ZPL through a native TCP socket to the printer's fixed LAN address, normally port 9100.
4. iOS opens the operating-system print dialog using 102 × 51 mm HTML pages. This requires a printer or print server visible to iOS.
5. The app reports `PRINTED` after the complete payload is accepted by the printer socket, or `FAILED` when transmission fails. Print counters only increment on the first successful completion of a job. Raw TCP printers do not prove that media physically exited, so operators must still react to paper-out/ribbon/error lights.

If labels reached the printer but the status callback could not reach the API, the job remains `SENDING` and the app warns the operator to inspect the output. In the printer-admin screen, confirm `PRINTED` only after seeing the physical labels, or choose `Non imprimé` to move it safely to `FAILED`. A later new job is treated as a reprint and requires a reason, preventing silent duplicate labels.

An Expo Go build cannot load the Android TCP module. A new development client and production binary are required after adding or changing `modules/lexd-zpl-printer`; this is not an OTA-only release.

## Printer and media requirements

- Network-connected thermal label printer with ZPL/ZPL II support and raw TCP printing.
- Ethernet is preferred for the printer; warehouse Android devices may use Wi-Fi on a network that can reach it.
- 203 dpi is adequate for the current 4 × 2 inch (102 × 51 mm) layout; 300 dpi is supported for smaller text and denser labels.
- Use genuine 102 × 51 mm labels and calibrate the printer for the media gap before acceptance testing.
- Use direct thermal media for short warehouse/shipping life. Use thermal-transfer media and a matching ribbon when labels must resist heat, sunlight, abrasion, or long storage.
- Give each printer a DHCP reservation or static IP. Never expose TCP 9100 to the public internet.

## Production rollout

1. Back up MongoDB and confirm it is a replica set. Transactional scan assignment requires replica-set transactions.
2. Deploy the backend models, indexes, APIs, and compatibility synchronization first.
3. Run a dry migration:

   ```bash
   cd lexdbackend
   npm run migrate:goods-packages
   ```

4. Review failures, then execute:

   ```bash
   npm run migrate:goods-packages -- --execute --batch-size=100
   ```

   Existing records default to one physical package because historical `quantity` cannot safely reveal carton count. For known exceptions, prepare a JSON object such as `{ "G-2607-0123": 4 }`, validate it in the dry run, then use the same file for execution:

   ```bash
   npm run migrate:goods-packages -- --package-count-map=C:\secure\package-counts.json
   npm run migrate:goods-packages -- --execute --batch-size=100 --package-count-map=C:\secure\package-counts.json
   ```

   Unknown goods codes and counts outside 1–999 fail the migration. Keep this operational input outside the repository if it contains internal shipment references.

5. Deploy a new Android binary. Do not enable the receive-team workflow until most warehouse devices have this native build.
6. In Admin Dashboard → Tools → Imprimantes d’étiquettes, add the printer, set the correct warehouse location/DPI/label size, make it default, and run the connection test.
7. Print and scan acceptance labels for SEA container, loose AIR AWB, and AIR cargo bag. Confirm wrong-mode, replaced-label, duplicate-scan, closed-target, and offline-printer behavior.
8. Start with one receiving station, monitor failed print jobs and scan conflicts, then expand to all stations.

## Network and device checklist

- Android device and printer can communicate over the warehouse LAN.
- Firewall permits device VLAN → printer IP on TCP 9100 only.
- Printer has a reserved address and is not reachable from guest Wi-Fi or the internet.
- Camera permission is granted on scanning devices.
- Printer media size, darkness, speed, and gap calibration are correct.
- At least one spare label roll and, for thermal transfer, matching ribbon are stocked.

## Recovery

- Failed print: correct connectivity, then resend the same immutable job from the recent-jobs section. The attempt count and failure history remain auditable. Use a new reprint job only when another physical copy is intentionally required.
- Uncertain `SENDING` job: inspect the printer first. Confirm it as printed if labels exist; otherwise mark it not printed and resend it. Never resend an uncertain job blindly.
- Damaged/lost label: replace the label in the app; the old QR becomes invalid immediately.
- Response lost after scan: rescanning is safe; assignment is idempotent and returns “already assigned.”
- Printer unavailable: choose another active printer. On iOS, use the system print path if an appropriate printer/print server is available.
- Bad mobile release: backend and existing manual assignment remain compatible; roll back the binary, but do not delete package/label records.

## Monitoring

Alert on repeated `FAILED` print jobs, printers reporting `ERROR`/`OFFLINE`, `LABEL_REVOKED` scans, shipping-mode conflicts, cross-container/cross-AWB conflicts, and transaction errors. Audit events cover printer configuration, print requests/outcomes, reprints, label replacement, and package assignments.
