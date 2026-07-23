import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadAnnouncementImage } from '../../../../api/uploadAnnouncementImage';
import { AnnouncementImagePicker } from '../AnnouncementImagePicker';

jest.mock('@expo/vector-icons', () => ({ Ionicons: 'Ionicons' }));
jest.mock('expo-image-picker', () => ({
  MediaTypeOptions: { Images: 'Images' },
  launchImageLibraryAsync: jest.fn(),
}));
jest.mock('../../../../api/uploadAnnouncementImage', () => ({ uploadAnnouncementImage: jest.fn() }));

const pickImage = ImagePicker.launchImageLibraryAsync as jest.MockedFunction<typeof ImagePicker.launchImageLibraryAsync>;
const uploadImage = uploadAnnouncementImage as jest.MockedFunction<typeof uploadAnnouncementImage>;

describe('AnnouncementImagePicker', () => {
  it('keeps the parent form locked until the uploaded URL is available', async () => {
    pickImage.mockResolvedValue({
      canceled: false,
      assets: [{ uri: 'file:///picked.jpg' }],
    } as ImagePicker.ImagePickerResult);
    let finishUpload: (url: string) => void = () => undefined;
    uploadImage.mockReturnValue(new Promise((resolve) => { finishUpload = resolve; }));
    const onChange = jest.fn();
    const onUploadingChange = jest.fn();
    const screen = render(
      <AnnouncementImagePicker onChange={onChange} onUploadingChange={onUploadingChange} />,
    );

    fireEvent.press(screen.getByText('Ajouter une image'));
    await waitFor(() => expect(onUploadingChange).toHaveBeenCalledWith(true));
    expect(onChange).not.toHaveBeenCalled();

    finishUpload('https://cdn.test/announcement.jpg');
    await waitFor(() => expect(onChange).toHaveBeenCalledWith('https://cdn.test/announcement.jpg'));
    expect(onUploadingChange).toHaveBeenLastCalledWith(false);
  });
});
