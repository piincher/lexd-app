import React, { useState, useCallback } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Button } from '@src/shared/ui/Button';
import type { PromoCampaignAdmin } from '../../api/promoCampaignAdminApi';
import type { PromoCampaign } from '../../types';
import {
  useCreatePromoCampaign,
  useUpdatePromoCampaign,
  useUploadPromoCampaignImages,
} from '../../hooks/usePromoCampaignAdminMutations';
import { BasicFields } from './BasicFields';
import { SlideEditor } from './SlideEditor';
import { createStyles } from './PromoCampaignForm.styles';

interface PromoCampaignFormProps {
  campaign?: PromoCampaignAdmin;
  campaignId?: string;
}

interface FormSlide {
  imageUrl: string;
  title: string;
  body: string;
  ctaText: string;
  ctaAction: string;
  ctaTarget: string;
  order: number;
}

const EMPTY_SLIDE: FormSlide = {
  imageUrl: '',
  title: '',
  body: '',
  ctaText: '',
  ctaAction: 'DISMISS',
  ctaTarget: '',
  order: 0,
};

const isRemoteUrl = (url: string): boolean => /^https?:\/\//i.test(url);

const buildPayload = (
  title: string,
  subtitle: string,
  body: string,
  slides: FormSlide[],
  backgroundColor: string,
  textColor: string,
  startDate: string,
  endDate: string,
  targetLanguages: string,
  targetPlatforms: string,
  dismissBehavior: string,
  priority: string,
  status: string,
) => ({
  title,
  subtitle: subtitle || undefined,
  body: body || undefined,
  slides: slides.map((s, i) => ({ ...s, order: i })),
  backgroundColor,
  textColor,
  startDate: new Date(startDate).toISOString(),
  endDate: new Date(endDate).toISOString(),
  targetLanguages: targetLanguages.split(',').map((lang) => lang.trim()).filter(Boolean),
  targetPlatforms: targetPlatforms.split(',').map((plat) => plat.trim()).filter(Boolean),
  dismissBehavior,
  priority: Number(priority) || 0,
  status,
});

export const PromoCampaignForm: React.FC<PromoCampaignFormProps> = ({ campaign, campaignId }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation();
  const createMutation = useCreatePromoCampaign();
  const updateMutation = useUpdatePromoCampaign();
  const uploadImagesMutation = useUploadPromoCampaignImages();

  const [title, setTitle] = useState(campaign?.title || '');
  const [subtitle, setSubtitle] = useState(campaign?.subtitle || '');
  const [body, setBody] = useState(campaign?.body || '');
  const [backgroundColor, setBackgroundColor] = useState(campaign?.backgroundColor || '#1E3A5F');
  const [textColor, setTextColor] = useState(campaign?.textColor || '#FFFFFF');
  const [slides, setSlides] = useState<FormSlide[]>(
    campaign?.slides?.length
      ? campaign.slides.map((s, i) => ({
          imageUrl: s.imageUrl,
          title: s.title || '',
          body: s.body || '',
          ctaText: s.ctaText || '',
          ctaAction: s.ctaAction,
          ctaTarget: s.ctaTarget || '',
          order: i,
        }))
      : [EMPTY_SLIDE]
  );
  const [startDate, setStartDate] = useState(campaign ? new Date(campaign.startDate).toISOString().slice(0, 10) : '');
  const [endDate, setEndDate] = useState(campaign ? new Date(campaign.endDate).toISOString().slice(0, 10) : '');
  const [targetLanguages, setTargetLanguages] = useState((campaign?.targetLanguages || ['fr']).join(','));
  const [targetPlatforms, setTargetPlatforms] = useState((campaign?.targetPlatforms || ['ios', 'android']).join(','));
  const [dismissBehavior, setDismissBehavior] = useState(campaign?.dismissBehavior || 'SHOW_AGAIN_NEXT_LAUNCH');
  const [priority, setPriority] = useState(String(campaign?.priority || 0));
  const [status, setStatus] = useState(campaign?.status || 'ACTIVE');

  const isSubmitting = createMutation.isPending || updateMutation.isPending || uploadImagesMutation.isPending;

  const updateSlide = useCallback((index: number, field: string, value: string) => {
    setSlides((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }, []);

  const addSlide = useCallback(() => {
    setSlides((prev) => [...prev, { ...EMPTY_SLIDE, order: prev.length }]);
  }, []);

  const removeSlide = useCallback((index: number) => {
    setSlides((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const submitCampaign = useCallback(
    (finalSlides: FormSlide[]) => {
      const payload = buildPayload(
        title,
        subtitle,
        body,
        finalSlides,
        backgroundColor,
        textColor,
        startDate,
        endDate,
        targetLanguages,
        targetPlatforms,
        dismissBehavior,
        priority,
        status,
      );

      if (campaignId) {
        updateMutation.mutate(
          { id: campaignId, data: payload },
          {
            onSuccess: () => navigation.goBack(),
            onError: (err) => Alert.alert('Erreur', err.message || 'Une erreur est survenue'),
          },
        );
      } else {
        createMutation.mutate(payload, {
          onSuccess: () => navigation.goBack(),
          onError: (err) => Alert.alert('Erreur', err.message || 'Une erreur est survenue'),
        });
      }
    },
    [
      title,
      subtitle,
      body,
      backgroundColor,
      textColor,
      startDate,
      endDate,
      targetLanguages,
      targetPlatforms,
      dismissBehavior,
      priority,
      status,
      campaignId,
      createMutation,
      updateMutation,
      navigation,
    ],
  );

  const handleSubmit = useCallback(() => {
    if (!title.trim() || slides.some((s) => !s.imageUrl.trim()) || !startDate || !endDate) {
      Alert.alert('Champs requis', 'Veuillez remplir le titre, les dates et sélectionner une image pour chaque slide.');
      return;
    }

    const localUris: string[] = [];
    const uriToIndex = new Map<string, number>();

    slides.forEach((slide, index) => {
      if (!isRemoteUrl(slide.imageUrl)) {
        localUris.push(slide.imageUrl);
        uriToIndex.set(slide.imageUrl, index);
      }
    });

    if (localUris.length === 0) {
      submitCampaign(slides);
      return;
    }

    uploadImagesMutation.mutate(localUris, {
      onSuccess: (response) => {
        const urls = response.data?.urls || [];
        if (urls.length !== localUris.length) {
          Alert.alert('Erreur', "Le nombre d'images retourné ne correspond pas.");
          return;
        }

        const nextSlides = slides.map((slide) => ({ ...slide }));
        urls.forEach((url, i) => {
          const slideIndex = uriToIndex.get(localUris[i]);
          if (slideIndex !== undefined) {
            nextSlides[slideIndex].imageUrl = url;
          }
        });

        submitCampaign(nextSlides);
      },
      onError: (err) => {
        Alert.alert('Erreur de téléchargement', err.message || "Impossible d'envoyer les images.");
      },
    });
  }, [slides, title, startDate, endDate, submitCampaign, uploadImagesMutation]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <BasicFields
        title={title} setTitle={setTitle}
        subtitle={subtitle} setSubtitle={setSubtitle}
        body={body} setBody={setBody}
        backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor}
        textColor={textColor} setTextColor={setTextColor}
        startDate={startDate} setStartDate={setStartDate}
        endDate={endDate} setEndDate={setEndDate}
        targetLanguages={targetLanguages} setTargetLanguages={setTargetLanguages}
        targetPlatforms={targetPlatforms} setTargetPlatforms={setTargetPlatforms}
        dismissBehavior={dismissBehavior} setDismissBehavior={(v) => setDismissBehavior(v as PromoCampaign['dismissBehavior'])}
        priority={priority} setPriority={setPriority}
        status={status} setStatus={setStatus}
      />
      <SlideEditor slides={slides} updateSlide={updateSlide} removeSlide={removeSlide} addSlide={addSlide} />
      <Button title={campaignId ? 'Mettre à jour' : 'Créer'} onPress={handleSubmit} loading={isSubmitting} fullWidth />
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};
