import ResourceCard from '../model/card-model.js';
export default {
    getCards() {
        return [
            new ResourceCard({ id: 1, titleKey: 'card.technical', icon: 'pi-cog', route: 'technical' }),
            new ResourceCard({ id: 2, titleKey: 'card.news', icon: 'pi-globe', route: 'news' }),
            new ResourceCard({ id: 3, titleKey: 'card.advances', icon: 'pi-chart-line', route: 'advances' }),
            new ResourceCard({ id: 4, titleKey: 'card.videos', icon: 'pi-video', route: 'videos' }),
            new ResourceCard({ id: 5, titleKey: 'card.manuals', icon: 'pi-book', route: 'manuals' }),
            new ResourceCard({ id: 6, titleKey: 'card.recommendations', icon: 'pi-comments', route: 'recommendations' }),
        ];
    }
}