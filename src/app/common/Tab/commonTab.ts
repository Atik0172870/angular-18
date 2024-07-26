export interface menuTab {
    id: number;
    name: string;
}
export class menuTabItems {
    tabList: Array<menuTab> = new Array<menuTab>();
    selectedTab: menuTab = { id: 1, name: 'Personnel Information' };
}
