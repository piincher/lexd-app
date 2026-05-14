import os, re, sys

files = [
'src/features/admin/analytics/components/CustomerChartRow.tsx',
'src/features/admin/analytics/components/DashboardContent/DashboardContent.styles.ts',
'src/features/admin/analytics/components/DashboardErrorState/DashboardErrorState.styles.ts',
'src/features/admin/analytics/components/DashboardFAB/DashboardFAB.styles.ts',
'src/features/admin/analytics/components/DashboardSkeleton/DashboardSkeleton.styles.ts',
'src/features/admin/analytics/components/ExportDialog/ExportDialog.styles.ts',
'src/features/admin/analytics/components/PaymentMetrics/PaymentAgingView.tsx',
'src/features/admin/analytics/components/PaymentMetrics/PaymentMetricsHeader.tsx',
'src/features/admin/analytics/components/PaymentMetrics/PaymentMetricsTabs.tsx',
'src/features/admin/analytics/components/PeriodSelector/PeriodSelector.styles.ts',
'src/features/admin/analytics/components/RevenueChart.styles.ts',
'src/features/admin/analytics/components/TopCustomersChart.styles.ts',
'src/features/admin/analytics/components/TopCustomersChart.tsx',
'src/features/admin/analytics/screens/AnalyticsDashboardScreen.styles.ts',
'src/features/admin/announcements/components/AnnouncementListItem/styles.ts',
'src/features/admin/announcements/screens/AnnouncementListScreen.styles.ts',
'src/features/admin/audit/components/AuditChangeSet.tsx',
'src/features/admin/audit/components/AuditDetailBlock.styles.ts',
'src/features/admin/audit/components/AuditFilters.styles.ts',
'src/features/admin/audit/components/AuditInfoCard.tsx',
'src/features/admin/audit/components/AuditJsonBlock.tsx',
'src/features/admin/audit/components/AuditLogCard.styles.ts',
'src/features/admin/audit/screens/AuditLogDetailScreen.styles.ts',
'src/features/admin/audit/screens/AuditLogListScreen.styles.ts',
'src/features/admin/communications/components/CampaignCard/CampaignCard.styles.ts',
'src/features/admin/communications/components/CampaignEmptyState/index.tsx',
'src/features/admin/communications/components/CampaignSubmitFooter/CampaignSubmitFooter.styles.ts',
'src/features/admin/communications/components/MessageComposer/CategoryTabs.tsx',
'src/features/admin/communications/components/MessageComposer/MessageComposer.styles.ts',
'src/features/admin/communications/components/MessageComposer/MessageInput.tsx',
'src/features/admin/communications/components/MessageComposer/SendButton.tsx',
'src/features/admin/communications/components/MessageComposer/TemplateChips.tsx',
'src/features/admin/communications/components/RecipientSelector/DatePickerRow.tsx',
'src/features/admin/communications/components/RecipientSelector/ModeToggle.tsx',
'src/features/admin/communications/components/RecipientSelector/RecipientEmptyState.tsx',
'src/features/admin/communications/components/RecipientSelector/RecipientSelector.styles.ts',
'src/features/admin/communications/components/RecipientSelector/RecipientSelector.tsx',
'src/features/admin/communications/components/SendConfirmationModal.tsx',
'src/features/admin/communications/components/SendSmsSuccessOverlay/index.tsx',
'src/features/admin/communications/components/SmsBalanceHeader.tsx',
'src/features/admin/communications/components/SmsSubscriptionCard/components/CardHeader.tsx',
'src/features/admin/communications/components/SmsSubscriptionCard/components/ProgressSection.tsx',
'src/features/admin/communications/components/SmsSubscriptionCard/components/StatsRow.tsx',
'src/features/admin/communications/components/SmsSubscriptionCard/index.tsx',
'src/features/admin/communications/components/SmsSubscriptionList.tsx',
'src/features/admin/communications/screens/SendSms.styles.ts',
'src/features/admin/export/components/DataExportHeader/DataExportHeader.styles.ts',
'src/features/admin/export/components/ExportDataModal/ExportDataModal.styles.ts',
'src/features/admin/export/components/GoodsPdfDateSelector/GoodsPdfDateSelector.styles.ts',
'src/features/admin/export/components/GoodsPdfDateSelector/index.tsx',
'src/features/admin/export/components/GoodsPdfExportButton/GoodsPdfExportButton.styles.ts',
'src/features/admin/export/components/GoodsPdfExportHeader/GoodsPdfExportHeader.styles.ts',
'src/features/admin/export/components/GoodsPdfExportHeader/index.tsx',
'src/features/admin/export/components/GoodsPdfPreviewCard/GoodsPdfPreviewCard.styles.ts',
'src/features/admin/export/components/GoodsPdfPreviewCard/index.tsx',
'src/features/admin/export/components/QuickExportButtons/QuickExportButtons.styles.ts',
'src/features/admin/export/constants.ts',
'src/features/admin/export/screens/DataExportScreen.tsx',
'src/features/admin/export/screens/GoodsPdfExportScreen.styles.ts',
'src/features/admin/notification-events/components/NotificationEventCard.styles.ts',
'src/features/admin/notification-events/components/NotificationEventDetailBlock.styles.ts',
'src/features/admin/notification-events/components/NotificationEventFilters.styles.ts',
'src/features/admin/notification-events/screens/NotificationEventDetailScreen.styles.ts',
'src/features/admin/notification-events/screens/NotificationEventListScreen.styles.ts',
'src/features/admin/search/components/FilterCategorySection.tsx',
'src/features/admin/search/components/FilterChipGroup.tsx',
'src/features/admin/search/components/FilterFAB.tsx',
'src/features/admin/search/components/FilterPanelModal.tsx',
'src/features/admin/search/components/FilterPresetsModal.tsx',
'src/features/admin/search/components/FilterSectionContainer.tsx',
'src/features/admin/search/components/FilterSummaryChips.tsx',
'src/features/admin/search/components/GlobalSearchActiveFilters.tsx',
'src/features/admin/search/components/GlobalSearchBar.styles.ts',
'src/features/admin/search/components/GlobalSearchBar.tsx',
'src/features/admin/search/components/GlobalSearchHeader.tsx',
'src/features/admin/search/components/SearchFilters.tsx',
'src/features/admin/search/components/SearchFilters/ClientFilters.tsx',
'src/features/admin/search/components/SearchFilters/ContainerFilters.tsx',
'src/features/admin/search/components/SearchFilters/GoodsFilters.tsx',
'src/features/admin/search/components/SearchFilters/SearchFiltersFooter.tsx',
'src/features/admin/search/components/SearchFilters/SearchFiltersHeader.tsx',
'src/features/admin/search/components/SearchFilters/SearchFiltersSummary.tsx',
'src/features/admin/search/components/SearchFiltersPanel.tsx',
'src/features/admin/search/components/SearchInputHeader.tsx',
'src/features/admin/search/components/SearchRecents/index.tsx',
'src/features/admin/search/components/SearchResults/ClientResultItem.tsx',
'src/features/admin/search/components/SearchResults/ContainerResultItem.tsx',
'src/features/admin/search/components/SearchResults/EntitySearchResults.tsx',
'src/features/admin/search/components/SearchResults/GlobalSearchResults.tsx',
'src/features/admin/search/components/SearchResults/GoodsResultItem.tsx',
'src/features/admin/search/components/SearchResults/SearchEmptyState.tsx',
'src/features/admin/search/components/SearchResults/SearchErrorState.tsx',
'src/features/admin/search/components/SearchResults/SearchLoadingState.tsx',
'src/features/admin/search/components/SearchResults/SearchResultItem.styles.ts',
'src/features/admin/search/components/SearchResults/SearchResultSection.tsx',
'src/features/admin/search/components/SearchResultsList.tsx',
'src/features/admin/search/components/SearchStatsPanel.tsx',
'src/features/admin/search/components/SearchSuggestions/index.tsx',
'src/features/admin/search/hooks/useSearchHighlight.tsx',
'src/features/admin/search/screens/GlobalSearchScreen.tsx',
'src/features/admin/users/components/ClientCard/ClientCardSkeleton.tsx',
'src/features/admin/users/components/ClientDetailHeader/ClientDetailHeader.styles.ts',
'src/features/admin/users/components/ProfileCard/ProfileCard.styles.ts',
'src/features/admin/users/components/RecentOrders/RecentOrders.styles.ts',
'src/features/admin/users/components/RoleFilterChips/RoleFilterChips.styles.ts',
'src/features/admin/users/components/SearchBar/SearchBar.styles.ts',
'src/features/admin/users/components/StatGrid/StatGrid.styles.ts',
'src/features/admin/users/components/StatusChart/StatusChart.styles.ts',
'src/features/admin/users/screens/ClientManagement.styles.ts',
'src/features/admin/users/screens/SelectUser.styles.ts',
'src/features/admin/whatsapp-requests/components/WhatsAppRequestCardActions/index.tsx',
'src/features/admin/whatsapp-requests/components/WhatsAppRequestCardCustomer/index.tsx',
'src/features/admin/whatsapp-requests/components/WhatsAppRequestCardHeader/index.tsx',
'src/features/admin/whatsapp-requests/components/WhatsAppRequestCardSearchResults/index.tsx',
'src/features/admin/whatsapp-requests/components/WhatsAppRequestCardType/index.tsx',
'src/features/admin/whatsapp-requests/screens/WhatsAppRequestListScreen/WhatsAppRequestListScreen.tsx',
'src/features/admin/whatsapp-requests/screens/WhatsAppRequestListScreen/components/WhatsAppRequestCard.tsx',
'src/features/admin/whatsapp-requests/screens/WhatsAppRequestListScreen/components/WhatsAppRequestEmptyState.tsx',
'src/features/admin/whatsapp-requests/screens/WhatsAppRequestListScreen/components/WhatsAppRequestErrorSnackbar.tsx',
'src/features/admin/whatsapp-requests/screens/WhatsAppRequestListScreen/components/WhatsAppRequestErrorState.tsx',
'src/features/admin/whatsapp-requests/screens/WhatsAppRequestListScreen/components/WhatsAppRequestFilters.tsx',
'src/features/admin/whatsapp-requests/screens/WhatsAppRequestListScreen/components/WhatsAppRequestHeader.tsx',
'src/features/admin/whatsapp-requests/screens/WhatsAppRequestListScreen/components/WhatsAppRequestList.tsx',
'src/features/admin/whatsapp-requests/screens/WhatsAppRequestListScreen/components/WhatsAppRequestLoadingState.tsx',
'src/features/admin/whatsapp-requests/screens/WhatsAppRequestListScreen/components/WhatsAppRequestPDFModal.tsx',
'src/features/admin/whatsapp-requests/screens/WhatsAppRequestListScreen/components/WhatsAppRequestStats.tsx',
'src/features/admin/whatsapp-requests/screens/WhatsAppRequestListScreen/constants.ts',
]

def has_top_level_color_usage(content):
    # Remove block comments roughly
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    lines = content.split('\n')
    depth = 0
    for line in lines:
        # Remove single-line comments
        line = re.sub(r'//.*', '', line)
        # Check depth before braces on this line
        if depth == 0:
            if re.search(r'Theme\.(colors|status|background|text|neutral|primary|accent|feedback)', line):
                return True
        # Update depth by counting braces not in strings (rough)
        # Remove strings
        clean = re.sub(r"'[^']*'", "''", line)
        clean = re.sub(r'"[^"]*"', '""', clean)
        # Remove template literal strings (rough)
        clean = re.sub(r'`[^`]*`', '``', clean)
        depth += clean.count('{') - clean.count('}')
        if depth < 0:
            depth = 0
    return False

for f in files:
    path = f
    if not os.path.exists(path):
        print(f'MISSING {path}')
        continue
    with open(path, 'r', encoding='utf-8') as fh:
        content = fh.read()
    has_import = bool(re.search(r"import.*Theme.*from ['\"]@src/(constants/Theme|shared/constants/Theme)['\"]", content))
    if not has_import:
        continue
    top = has_top_level_color_usage(content)
    if top:
        print(f'TOP {path}')
    else:
        print(f'INLINE {path}')
