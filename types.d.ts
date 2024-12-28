declare module "obsidian" {
    interface App {
        workspace: Workspace;
    }

    interface Workspace {
        getLeavesOfType(type: string): WorkspaceLeaf[];
        getLeaf(type: string): WorkspaceLeaf;
        revealLeaf(leaf: WorkspaceLeaf): void;
    }

    interface WorkspaceLeaf {
        setViewState(state: any): Promise<void>;
    }

    interface Plugin {
        app: App;
        loadData(): Promise<any>;
        saveData(data: any): Promise<void>;
        registerView(type: string, viewCreator: (leaf: WorkspaceLeaf) => View): void;
        addRibbonIcon(icon: string, title: string, callback: () => void): HTMLElement;
        addCommand(command: Command): void;
    }

    interface Command {
        id: string;
        name: string;
        callback: () => void;
        hotkeys?: Hotkey[];
    }

    interface Hotkey {
        modifiers: string[];
        key: string;
    }

    interface View {
        getViewType(): string;
    }

    class ItemView implements View {
        containerEl: HTMLElement;
        constructor(leaf: WorkspaceLeaf);
        getViewType(): string;
        onOpen(): Promise<void>;
    }
}

declare module "fabric" {
    export interface Canvas {
        isDrawingMode: boolean;
        freeDrawingBrush: any;
        getZoom(): number;
        zoomToPoint(point: Point, zoom: number): void;
        on(event: string, handler: (e: any) => void): void;
    }

    export class Point {
        constructor(x: number, y: number);
    }

    export class PencilBrush {
        constructor(canvas: Canvas);
        width: number;
        color: string;
    }
} 