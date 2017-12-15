export class ShareService {
    public share(title: string, description: string): Promise<void> {
        window.open(`mailto:?subject=${title}&body=${encodeURIComponent(description)}`, '_self');
        return Promise.resolve();
    }
}
