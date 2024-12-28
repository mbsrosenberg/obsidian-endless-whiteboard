import { ItemView, WorkspaceLeaf } from 'obsidian';
import { fabric } from 'fabric';
import EndlessWhiteboardPlugin from './main';

export const VIEW_TYPE_WHITEBOARD = 'endless-whiteboard-view';

export class WhiteboardView extends ItemView {
    canvas: fabric.Canvas;
    plugin: EndlessWhiteboardPlugin;
    
    constructor(leaf: WorkspaceLeaf, plugin: EndlessWhiteboardPlugin) {
        super(leaf);
        this.plugin = plugin;
    }

    getViewType(): string {
        return VIEW_TYPE_WHITEBOARD;
    }

    getDisplayText(): string {
        return 'Endless Whiteboard';
    }

    async onOpen() {
        // Add console log for debugging
        console.log('Opening Endless Whiteboard view');
        
        const container = this.containerEl.children[1] as HTMLElement;
        container.empty();
        container.addClass('endless-whiteboard-container');

        // Create toolbar
        const toolbar = createDiv('endless-whiteboard-toolbar');
        this.createToolbar(toolbar);
        container.appendChild(toolbar);

        // Create canvas container
        const canvasContainer = createDiv('endless-whiteboard-canvas-container');
        container.appendChild(canvasContainer);
        
        // Initialize Fabric.js canvas
        const canvasEl = document.createElement('canvas');
        canvasContainer.appendChild(canvasEl);
        
        this.canvas = new fabric.Canvas(canvasEl, {
            isDrawingMode: true,
            width: canvasContainer.clientWidth,
            height: canvasContainer.clientHeight
        });

        // Initialize touch and gesture handlers
        this.initializeTouchHandlers();
    }

    private createToolbar(toolbar: HTMLElement) {
        const buttons = [
            { icon: '✏️', action: () => this.enableDrawingMode() },
            { icon: '🗑️', action: () => this.enableEraserMode() },
            { icon: '📎', action: () => this.showEmbedDialog() },
            { icon: '📝', action: () => this.startOCR() },
            { icon: '⬇️', action: () => this.showExportDialog() }
        ];

        buttons.forEach(({ icon, action }) => {
            const btn = document.createElement('button');
            btn.textContent = icon;
            btn.className = 'touch-friendly-button';
            btn.addEventListener('click', action);
            toolbar.appendChild(btn);
        });
    }

    // New methods for additional functionality
    private showEmbedDialog() {
        // TODO: Implement file embedding dialog
    }

    private startOCR() {
        // TODO: Implement OCR functionality
    }

    private showExportDialog() {
        // TODO: Implement export dialog
    }

    private initializeTouchHandlers() {
        // Add debug logging
        console.log('Initializing touch handlers');
        
        let lastDistance = 0;
        let isZooming = false;

        this.canvas.on('touch:gesture', (event: any) => {
            console.log('Touch gesture detected', event);
            if (event.e.touches && event.e.touches.length === 2) {
                isZooming = true;
                const distance = Math.hypot(
                    event.e.touches[0].clientX - event.e.touches[1].clientX,
                    event.e.touches[0].clientY - event.e.touches[1].clientY
                );

                if (lastDistance) {
                    const scale = distance / lastDistance;
                    const zoom = this.canvas.getZoom() * scale;
                    this.canvas.zoomToPoint(
                        new fabric.Point(event.e.touches[0].clientX, event.e.touches[0].clientY),
                        Math.min(Math.max(zoom, 0.1), 20)
                    );
                }
                lastDistance = distance;
            }
        });

        // Reset zoom state when touch ends
        this.canvas.on('touch:end', () => {
            lastDistance = 0;
            isZooming = false;
        });
    }

    // Tool handlers
    private enableDrawingMode() {
        this.canvas.isDrawingMode = true;
        const brush = new fabric.PencilBrush(this.canvas);
        brush.width = 2;
        brush.color = '#000000';
        this.canvas.freeDrawingBrush = brush;
    }

    private enableEraserMode() {
        // Implement eraser mode
    }
} 