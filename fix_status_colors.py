import re, os

# Map of hardcoded status bg colors to theme equivalents
replacements = {
    "#F0FDF4": "Theme.colors.status.success + '15'",
    "#DCFCE7": "Theme.colors.status.success + '18'",
    "#FEE2E2": "Theme.colors.status.error + '15'",
    "#FEF2F2": "Theme.colors.status.error + '12'",
    "#FEF3C7": "Theme.colors.status.warning + '15'",
    "#FFFBF0": "Theme.colors.status.warning + '10'",
    "#FFFBEB": "Theme.colors.status.warning + '12'",
    "#DBEAFE": "Theme.colors.status.info + '15'",
    "#EFF6FF": "Theme.colors.status.info + '12'",
    "#E0E7FF": "Theme.colors.status.info + '12'",
    "#FFF3E0": "Theme.colors.status.warning + '12'",
    "#FCA5A5": "Theme.colors.status.error + '40'",
    "#D1FAE5": "Theme.colors.status.success + '18'",
    "#E8E4F3": "Theme.colors.primary.main + '12'",
}

files = [
    # Customer-facing
    'src/features/customer/containers/components/ContainerTrackingSkeleton.styles.ts',
    'src/features/customer/containers/components/ETACard/ETACard.styles.ts',
    'src/features/customer/containers/components/ContainerCard/ContainerCard.styles.ts',
    'src/features/customer/containers/components/TransitTimeline/components/RouteFlow.tsx',
    # High-visibility admin
    'src/features/admin/containers/screens/CreateContainer/CreateContainerScreen.styles.ts',
    'src/features/admin/containers/components/LoadingSequenceItem.styles.ts',
    'src/features/admin/containers/components/ContainerWaypointTracker/ContainerWaypointTracker.styles.ts',
    'src/features/admin/containers/components/ContainerWaypointTracker/components/WaypointCard/WaypointCard.styles.ts',
    'src/features/admin/containers/components/WaypointModalHeader.tsx',
    'src/features/admin/orders/components/ActiveOrderHeaderCard/ActiveOrderHeaderCard.styles.ts',
    'src/features/admin/certificates/components/UserCard/UserCard.styles.ts',
    'src/features/admin/certificates/components/CertificateSuccessView/CertificateSuccessView.styles.ts',
    'src/features/admin/certificates/components/CertificateDetailStatusBadges/CertificateDetailStatusBadges.styles.ts',
    'src/features/admin/certificates/components/CertificateDetailActions/CertificateDetailActions.styles.ts',
    'src/features/admin/certificates/components/CertificateCard/CertificateCard.styles.ts',
    'src/features/admin/goods/components/VoidGoodsListItem/VoidGoodsListItem.styles.ts',
    'src/features/admin/promos/components/PromoCard/PromoCard.styles.ts',
    'src/features/admin/reviews/components/ReviewCard/ReviewCard.styles.ts',
    'src/features/stats/screens/components/PaymentOverview.styles.ts',
]

for f in files:
    if not os.path.exists(f):
        continue
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(new_content)
        print(f'FIXED: {f}')
    else:
        print(f'NO CHANGES: {f}')
