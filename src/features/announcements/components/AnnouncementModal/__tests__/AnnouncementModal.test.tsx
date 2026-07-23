import React from "react";
import { Image } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";
import { AnnouncementModal } from "../index";
import type { Announcement } from "../../../types";

jest.mock("@expo/vector-icons", () => ({ Ionicons: "Ionicons" }));
jest.mock("@src/shared/lib/haptics", () => ({ hapticLight: jest.fn() }));

const base: Announcement = {
  _id: "a1",
  title: "Nouvel entrepôt",
  message: "L'adresse a été mise à jour.",
  type: "INFO",
  placement: "MODAL",
  audience: "ALL",
  priority: 1,
  status: "PUBLISHED",
  startAt: new Date().toISOString(),
  endAt: null,
  dismissible: true,
  requiresAcknowledgement: false,
  viewerState: null,
};

const noop = () => {};

describe("AnnouncementModal (in-tree overlay)", () => {
  it("renders the announcement content when visible", () => {
    const screen = render(
      <AnnouncementModal
        announcement={base}
        visible
        onClose={noop}
        onAcknowledge={noop}
        onAction={noop}
      />,
    );

    expect(screen.getByText("Nouvel entrepôt")).toBeTruthy();
    expect(screen.getByText("L'adresse a été mise à jour.")).toBeTruthy();
    expect(screen.getByText("Fermer")).toBeTruthy();
  });

  it("renders the persisted hero image URL", () => {
    const screen = render(
      <AnnouncementModal
        announcement={{ ...base, imageUrl: "https://cdn.test/announcement.jpg" }}
        visible
        onClose={noop}
        onAcknowledge={noop}
        onAction={noop}
      />,
    );
    expect(screen.UNSAFE_getByType(Image).props.source).toEqual({ uri: "https://cdn.test/announcement.jpg" });
  });

  it("renders nothing when never opened", () => {
    const screen = render(
      <AnnouncementModal
        announcement={null}
        visible={false}
        onClose={noop}
        onAcknowledge={noop}
        onAction={noop}
      />,
    );

    expect(screen.queryByText("Nouvel entrepôt")).toBeNull();
    expect(
      screen.queryByTestId("announcement-overlay-backdrop", { includeHiddenElements: true }),
    ).toBeNull();
  });

  it("closes a dismissible pop-up from the backdrop and the Fermer button", () => {
    const onClose = jest.fn();
    const screen = render(
      <AnnouncementModal
        announcement={base}
        visible
        onClose={onClose}
        onAcknowledge={noop}
        onAction={noop}
      />,
    );

    fireEvent.press(
      screen.getByTestId("announcement-overlay-backdrop", { includeHiddenElements: true }),
    );
    fireEvent.press(screen.getByText("Fermer"));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("renders a swipeable carousel when the announcement has multiple parts", () => {
    const rich = {
      ...base,
      blocks: [
        { heading: "Nouveauté 1", body: "Détails 1" },
        { heading: "Nouveauté 2", body: "Détails 2" },
      ],
    };
    const screen = render(
      <AnnouncementModal
        announcement={rich}
        visible
        onClose={noop}
        onAcknowledge={noop}
        onAction={noop}
      />,
    );

    expect(screen.getByText("Nouvel entrepôt")).toBeTruthy();
    expect(screen.getByText("Nouveauté 1")).toBeTruthy();
    expect(screen.getByText("Suivant")).toBeTruthy();
  });

  it("blocks closing when acknowledgement is required", () => {
    const onClose = jest.fn();
    const onAcknowledge = jest.fn();
    const screen = render(
      <AnnouncementModal
        announcement={{ ...base, requiresAcknowledgement: true, dismissible: false }}
        visible
        onClose={onClose}
        onAcknowledge={onAcknowledge}
        onAction={noop}
      />,
    );

    // No close affordance, and the backdrop does not dismiss.
    expect(screen.queryByText("Fermer")).toBeNull();
    fireEvent.press(
      screen.getByTestId("announcement-overlay-backdrop", { includeHiddenElements: true }),
    );
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.press(screen.getByText("J'ai compris"));
    expect(onAcknowledge).toHaveBeenCalledTimes(1);
  });
});
