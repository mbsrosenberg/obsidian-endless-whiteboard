import { Plugin, WorkspaceLeaf } from 'obsidian';
import { WhiteboardView, VIEW_TYPE_WHITEBOARD } from './WhiteboardView';
import { WhiteboardSettings, DEFAULT_SETTINGS } from './WhiteboardSettings';

export default class EndlessWhiteboardPlugin extends Plugin {
    settings: WhiteboardSettings;

    async onload() {
        await this.loadSettings();

        // Register the custom view
        this.registerView(
            VIEW_TYPE_WHITEBOARD,
            (leaf: WorkspaceLeaf) => new WhiteboardView(leaf, this)
        );

        // Add ribbon icon
        this.addRibbonIcon('brush', 'Open Endless Whiteboard', () => {
            this.activateView();
        });

        // Add command to open whiteboard
        this.addCommand({
            id: 'open-endless-whiteboard',
            name: 'Open Endless Whiteboard',
            callback: () => this.activateView(),
            hotkeys: [{ modifiers: ['Mod'], key: 'w' }]
        });
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    async activateView() {
        const { workspace } = this.app;
        
        // Check if view is already open
        let leaf = workspace.getLeavesOfType(VIEW_TYPE_WHITEBOARD)[0];
        
        if (!leaf) {
            // Create new leaf and view
            leaf = workspace.getLeaf('split');
            await leaf.setViewState({
                type: VIEW_TYPE_WHITEBOARD,
                active: true
            });
        }
        
        // Reveal and focus the leaf
        workspace.revealLeaf(leaf);
    }
} 