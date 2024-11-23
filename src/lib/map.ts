export function mapLegendBuilder({title}: {title?: string}) {
    let legendContainer: HTMLDivElement | null = null
    let legendContent: HTMLDivElement | null = null
    let legendTitle: HTMLDivElement | null = null

    const getLegendContainer = () => {
        if (!legendContainer) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            legendContainer = L.DomUtil.create("div", "legend-container");
            legendContainer.className = "map-legend";
            legendContainer.id = "map-legend";
        }
        return legendContainer
    }

    const getLegendContent = () => {
        if(!legendContent){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            legendContent = L.DomUtil.create("div", "map-legend-content");
            legendContainer?.appendChild(legendContent);
        }
        return legendContent
    }

    const getLegendTitle = () => {
        if(title && !legendTitle){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            legendTitle = L.DomUtil.create("h4", "map-legend-title");
            legendTitle.innerText = title
        }
        return legendTitle
    }

    function addLegendRow({html, text, onClick}: {text?: string, html?: string, onClick?: (e: MouseEvent)=>void}) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const legendRowItem = L.DomUtil.create("div", "map-legend-item");
        legendRowItem.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick?.(e);
        })
        legendRowItem.addEventListener("dblclick", (e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick?.(e);
        })
        if(html) legendRowItem.innerHTML = html
        if(text) legendRowItem.innerText = text
        getLegendContent().appendChild(legendRowItem);
    }

    function create(){
        const container = getLegendContainer();

        const content = getLegendContent();
        container.appendChild(content)

        const _title = getLegendTitle()
        if(_title){
            const firstChild = content.firstChild
            if(firstChild)
                content.insertBefore(_title, firstChild)
            else
                content.appendChild(_title);
        }
        return container
    }

    return {
        create,
        addLegendRow,
    }
}