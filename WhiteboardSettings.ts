export interface WhiteboardSettings {
    defaultBrushSize: number;
    defaultColor: string;
    enablePressureSensitivity: boolean;
    enableTilt: boolean;
    defaultZoomLevel: number;
}

export const DEFAULT_SETTINGS: WhiteboardSettings = {
    defaultBrushSize: 2,
    defaultColor: '#000000',
    enablePressureSensitivity: true,
    enableTilt: true,
    defaultZoomLevel: 1
}; 