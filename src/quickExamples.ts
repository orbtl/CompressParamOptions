import { compressOptions, decompressOptions } from './index.js';
import type { StringOptionMap, NumberOptionMap, ArrayOptionMap, SelectedOptions } from './types/types.js';

console.log('=== EXAMPLE 1: User Preferences (50 options) ===');
const userPreferences: StringOptionMap = {
  'darkMode': 'dark_mode',
  'notifications': 'enable_notifications',
  'autoSave': 'auto_save',
  'spellCheck': 'spell_check',
  'autoComplete': 'auto_complete',
  'lineNumbers': 'show_line_numbers',
  'wordWrap': 'word_wrap',
  'minimap': 'show_minimap',
  'breadcrumbs': 'show_breadcrumbs',
  'rulers': 'show_rulers',
  'whitespace': 'render_whitespace',
  'indentGuides': 'indent_guides',
  'folding': 'code_folding',
  'fontLigatures': 'font_ligatures',
  'smoothScrolling': 'smooth_scrolling',
  'cursorBlinking': 'cursor_blinking',
  'cursorSmoothCaretAnimation': 'smooth_caret',
  'mouseWheelZoom': 'mouse_wheel_zoom',
  'multiCursorModifier': 'multi_cursor_alt',
  'accessibilitySupport': 'accessibility',
  'quickSuggestions': 'quick_suggestions',
  'parameterHints': 'parameter_hints',
  'autoClosingBrackets': 'auto_closing_brackets',
  'autoClosingQuotes': 'auto_closing_quotes',
  'autoSurround': 'auto_surround',
  'copyWithSyntaxHighlighting': 'copy_syntax_highlighting',
  'emptySelectionClipboard': 'empty_selection_clipboard',
  'links': 'detect_links',
  'occurrencesHighlight': 'highlight_occurrences',
  'renderFinalNewline': 'render_final_newline',
  'selectionHighlight': 'selection_highlight',
  'semanticHighlighting': 'semantic_highlighting',
  'showUnused': 'show_unused',
  'unusedVariables': 'fade_unused_variables',
  'unusedVariablesOpacity': 'unused_opacity_0_4',
  'bracketPairColorization': 'bracket_colorization',
  'guides': 'bracket_pair_guides',
  'highlightActiveIndentGuide': 'highlight_active_indent',
  'renderControlCharacters': 'render_control_chars',
  'renderLineHighlight': 'render_line_highlight',
  'renderValidationDecorations': 'validation_decorations',
  'scrollBeyondLastLine': 'scroll_beyond_last_line',
  'scrollBeyondLastColumn': 'scroll_beyond_last_column',
  'smoothScrolling2': 'editor_smooth_scrolling',
  'stopRenderingLineAfter': 'stop_rendering_long_lines',
  'suggest': 'intellisense_suggestions',
  'suggestOnTriggerCharacters': 'suggest_on_trigger',
  'acceptSuggestionOnEnter': 'accept_suggestion_enter',
  'tabCompletion': 'tab_completion',
  'wordBasedSuggestions': 'word_based_suggestions',
  'formatOnType': 'format_on_type'
};

const selectedUserPrefs: SelectedOptions = [
  'dark_mode', 'enable_notifications', 'auto_save', 'spell_check', 'show_line_numbers',
  'word_wrap', 'show_minimap', 'code_folding', 'smooth_scrolling', 'multi_cursor_alt',
  'quick_suggestions', 'auto_closing_brackets', 'detect_links', 'bracket_colorization',
  'intellisense_suggestions', 'format_on_type'
];

const compressedPrefs: string = compressOptions(userPreferences, selectedUserPrefs);
console.log('Selected preferences:', selectedUserPrefs.length, 'out of', Object.keys(userPreferences).length);
console.log('Compressed preferences:', compressedPrefs, '(length:', compressedPrefs.length, ')');
const decompressedPrefs: SelectedOptions = decompressOptions(userPreferences, compressedPrefs);
console.log('Decompressed correctly:', JSON.stringify(selectedUserPrefs.sort()) === JSON.stringify(decompressedPrefs.sort()));
console.log('');

console.log('=== EXAMPLE 2: Feature Flags (100 options) ===');
const featureFlags: NumberOptionMap = {};
for (let i = 1; i <= 100; i++) {
  featureFlags[i] = `FEATURE_${i}_ENABLED`;
}

const enabledFeatures: SelectedOptions = [
  'FEATURE_1_ENABLED', 'FEATURE_5_ENABLED', 'FEATURE_12_ENABLED', 'FEATURE_23_ENABLED',
  'FEATURE_34_ENABLED', 'FEATURE_45_ENABLED', 'FEATURE_56_ENABLED', 'FEATURE_67_ENABLED',
  'FEATURE_78_ENABLED', 'FEATURE_89_ENABLED', 'FEATURE_99_ENABLED'
];

const compressedFeatures: string = compressOptions(featureFlags, enabledFeatures);
console.log('Enabled features:', enabledFeatures.length, 'out of', Object.keys(featureFlags).length);
console.log('Compressed features:', compressedFeatures, '(length:', compressedFeatures.length, ')');
const decompressedFeatures: SelectedOptions = decompressOptions(featureFlags, compressedFeatures);
console.log('Decompressed correctly:', JSON.stringify(enabledFeatures.sort()) === JSON.stringify(decompressedFeatures.sort()));
console.log('');

console.log('=== EXAMPLE 3: Permission System (75 options) ===');
const permissions: StringOptionMap = {
  'readUsers': 'user:read',
  'writeUsers': 'user:write',
  'deleteUsers': 'user:delete',
  'readPosts': 'post:read',
  'writePosts': 'post:write',
  'deletePosts': 'post:delete',
  'readComments': 'comment:read',
  'writeComments': 'comment:write',
  'deleteComments': 'comment:delete',
  'readAnalytics': 'analytics:read',
  'writeAnalytics': 'analytics:write',
  'readReports': 'report:read',
  'writeReports': 'report:write',
  'deleteReports': 'report:delete',
  'readSettings': 'settings:read',
  'writeSettings': 'settings:write',
  'readBilling': 'billing:read',
  'writeBilling': 'billing:write',
  'readAudit': 'audit:read',
  'writeAudit': 'audit:write',
  'readAPI': 'api:read',
  'writeAPI': 'api:write',
  'deleteAPI': 'api:delete',
  'readWebhooks': 'webhook:read',
  'writeWebhooks': 'webhook:write',
  'deleteWebhooks': 'webhook:delete',
  'readIntegrations': 'integration:read',
  'writeIntegrations': 'integration:write',
  'deleteIntegrations': 'integration:delete',
  'readBackups': 'backup:read',
  'writeBackups': 'backup:write',
  'deleteBackups': 'backup:delete',
  'readLogs': 'log:read',
  'writeLogs': 'log:write',
  'deleteLogs': 'log:delete',
  'readMetrics': 'metric:read',
  'writeMetrics': 'metric:write',
  'deleteMetrics': 'metric:delete',
  'readAlerts': 'alert:read',
  'writeAlerts': 'alert:write',
  'deleteAlerts': 'alert:delete',
  'readDashboard': 'dashboard:read',
  'writeDashboard': 'dashboard:write',
  'deleteDashboard': 'dashboard:delete',
  'readWorkflows': 'workflow:read',
  'writeWorkflows': 'workflow:write',
  'deleteWorkflows': 'workflow:delete',
  'readTemplates': 'template:read',
  'writeTemplates': 'template:write',
  'deleteTemplates': 'template:delete',
  'readProjects': 'project:read',
  'writeProjects': 'project:write',
  'deleteProjects': 'project:delete',
  'readTeams': 'team:read',
  'writeTeams': 'team:write',
  'deleteTeams': 'team:delete',
  'readRoles': 'role:read',
  'writeRoles': 'role:write',
  'deleteRoles': 'role:delete',
  'readGroups': 'group:read',
  'writeGroups': 'group:write',
  'deleteGroups': 'group:delete',
  'readOrganization': 'org:read',
  'writeOrganization': 'org:write',
  'deleteOrganization': 'org:delete',
  'readFiles': 'file:read',
  'writeFiles': 'file:write',
  'deleteFiles': 'file:delete',
  'readMedia': 'media:read',
  'writeMedia': 'media:write',
  'deleteMedia': 'media:delete',
  'readNotifications': 'notification:read',
  'writeNotifications': 'notification:write',
  'deleteNotifications': 'notification:delete',
  'readMessages': 'message:read',
  'writeMessages': 'message:write',
  'deleteMessages': 'message:delete'
};

const userPermissions: SelectedOptions = [
  'user:read', 'user:write', 'post:read', 'post:write', 'comment:read', 'comment:write',
  'settings:read', 'dashboard:read', 'project:read', 'project:write', 'team:read',
  'file:read', 'file:write', 'notification:read', 'message:read', 'message:write'
];

const compressedPermissions: string = compressOptions(permissions, userPermissions);
console.log('User permissions:', userPermissions.length, 'out of', Object.keys(permissions).length);
console.log('Compressed permissions:', compressedPermissions, '(length:', compressedPermissions.length, ')');
const decompressedPermissions: SelectedOptions = decompressOptions(permissions, compressedPermissions);
console.log('Decompressed correctly:', JSON.stringify(userPermissions.sort()) === JSON.stringify(decompressedPermissions.sort()));
console.log('');

console.log('=== EXAMPLE 4: E-commerce Filters (120 options) ===');
const productFilters: StringOptionMap = {};
const categories: string[] = ['electronics', 'clothing', 'home', 'sports', 'books', 'toys', 'automotive', 'health'];
const brands: string[] = ['apple', 'samsung', 'nike', 'adidas', 'sony', 'lg', 'canon', 'dell', 'hp', 'lenovo'];
const colors: string[] = ['red', 'blue', 'green', 'black', 'white', 'gray', 'yellow', 'purple', 'orange', 'pink'];
const sizes: string[] = ['xs', 's', 'm', 'l', 'xl', 'xxl'];
const priceRanges: string[] = ['0-25', '25-50', '50-100', '100-200', '200-500', '500+'];

categories.forEach(cat => { productFilters[`cat_${cat}`] = `category:${cat}`; });
brands.forEach(brand => { productFilters[`brand_${brand}`] = `brand:${brand}`; });
colors.forEach(color => { productFilters[`color_${color}`] = `color:${color}`; });
sizes.forEach(size => { productFilters[`size_${size}`] = `size:${size}`; });
priceRanges.forEach(range => { productFilters[`price_${range}`] = `price:${range}`; });

// Add rating filters
for (let i = 1; i <= 5; i++) {
  productFilters[`rating_${i}star`] = `rating:${i}+`;
}

// Add availability filters
productFilters['inStock'] = 'availability:in_stock';
productFilters['onSale'] = 'availability:on_sale';
productFilters['newArrival'] = 'availability:new';
productFilters['freeShipping'] = 'shipping:free';

// Add random feature filters to reach 120
const features: string[] = [
  'waterproof', 'wireless', 'bluetooth', 'touchscreen', 'voice_control', 'ai_powered',
  'eco_friendly', 'premium', 'limited_edition', 'bestseller', 'award_winning', 'handmade',
  'vintage', 'modern', 'classic', 'luxury', 'budget', 'professional', 'beginner', 'advanced'
];
features.forEach(feature => { productFilters[`feature_${feature}`] = `feature:${feature}`; });

const selectedFilters: SelectedOptions = [
  'category:electronics', 'brand:apple', 'brand:samsung', 'color:black', 'color:white',
  'price:100-200', 'price:200-500', 'rating:4+', 'rating:5+', 'availability:in_stock',
  'shipping:free', 'feature:wireless', 'feature:bluetooth', 'feature:premium', 'feature:award_winning'
];

const compressedFilters: string = compressOptions(productFilters, selectedFilters);
console.log('Selected filters:', selectedFilters.length, 'out of', Object.keys(productFilters).length);
console.log('Compressed filters:', compressedFilters, '(length:', compressedFilters.length, ')');
const decompressedFilters: SelectedOptions = decompressOptions(productFilters, compressedFilters);
console.log('Decompressed correctly:', JSON.stringify(selectedFilters.sort()) === JSON.stringify(decompressedFilters.sort()));
console.log('');

console.log('=== EXAMPLE 5: With Uncompressed Options ===');
const basicOptions: StringOptionMap = {
  'opt1': 'option_one',
  'opt2': 'option_two',
  'opt3': 'option_three',
  'opt4': 'option_four'
};

const mixedSelection: SelectedOptions = ['option_one', 'option_three', 'custom_option_not_in_map', 'another_custom'];
const compressedMixed: string = compressOptions(basicOptions, mixedSelection, true, true);
console.log('Mixed selection (with uncompressed):', compressedMixed, '(length:', compressedMixed.length, ')');
const decompressedMixed: SelectedOptions = decompressOptions(basicOptions, compressedMixed);
console.log('Decompressed mixed:', decompressedMixed);
console.log('Decompressed correctly:', JSON.stringify(mixedSelection.sort()) === JSON.stringify(decompressedMixed.sort()));
console.log('');

console.log('=== EXAMPLE 6: Array Option Map (Simple List) ===');
const colorOptions: ArrayOptionMap = [
  'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'black', 'white', 'gray',
  'brown', 'cyan', 'magenta', 'lime', 'indigo', 'violet', 'maroon', 'navy', 'olive', 'teal'
];

const selectedColors: SelectedOptions = ['red', 'blue', 'green', 'black', 'white'];
const compressedColors: string = compressOptions(colorOptions, selectedColors);
console.log('Selected colors:', selectedColors.length, 'out of', colorOptions.length);
console.log('Compressed colors:', compressedColors, '(length:', compressedColors.length, ')');
const decompressedColors: SelectedOptions = decompressOptions(colorOptions, compressedColors);
console.log('Decompressed correctly:', JSON.stringify(selectedColors.sort()) === JSON.stringify(decompressedColors.sort()));
console.log('');

console.log('=== COMPRESSION EFFICIENCY COMPARISON ===');
interface TestCase {
  name: string;
  options: number;
  selected: number;
  compressed: number;
}

const testCases: TestCase[] = [
  { name: 'User Preferences', options: Object.keys(userPreferences).length, selected: selectedUserPrefs.length, compressed: compressedPrefs.length },
  { name: 'Feature Flags', options: Object.keys(featureFlags).length, selected: enabledFeatures.length, compressed: compressedFeatures.length },
  { name: 'Permissions', options: Object.keys(permissions).length, selected: userPermissions.length, compressed: compressedPermissions.length },
  { name: 'Product Filters', options: Object.keys(productFilters).length, selected: selectedFilters.length, compressed: compressedFilters.length },
  { name: 'Color Options', options: colorOptions.length, selected: selectedColors.length, compressed: compressedColors.length }
];

testCases.forEach(tc => {
  const originalSize: number = tc.selected * 20; // Assume average option name is 20 chars
  const compressionRatio: string = ((originalSize - tc.compressed) / originalSize * 100).toFixed(1);
  console.log(`${tc.name}: ${tc.selected}/${tc.options} options → ${tc.compressed} chars (${compressionRatio}% reduction)`);
});