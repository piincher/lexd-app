/**
 * Shared UI Components - Design System Primitives
 * 
 * This module provides reusable UI components built on react-native-paper.
 * These are simplified wrappers that maintain API compatibility with 
 * the existing components/ui components.
 * 
 * @example
 * import { Button, Input, Card } from '@src/shared/ui';
 * 
 * <Button title="Submit" onPress={handleSubmit} variant="primary" />
 * <Input label="Email" value={email} onChangeText={setEmail} />
 * <Card><Text>Content</Text></Card>
 */

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './Button';
export { Input, type InputProps, type InputVariant, type InputSize } from './Input';
export { Card, type CardProps, type CardVariant, type CardPadding } from './Card';
export { Badge, type BadgeProps, type BadgeVariant } from './Badge';
export { Screen, type ScreenProps, type ScreenVariant } from './Screen';
