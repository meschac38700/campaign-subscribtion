import {ControlPosition, Map} from "leaflet";
import {EstablishmentLayers} from "@/interfaces/establishment";

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

            // block propagation of click, dlbclick events
            // Prevent the click on the map when clicking on the legend panel
            legendContainer.addEventListener("click", (e) => {e.stopPropagation()})
            legendContainer.addEventListener("dblclick", (e) => {e.stopPropagation()})
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

    function addLegendRow({html, text, onClick}: {text?: string, html?: string, onClick?: (e: HTMLDivElement)=>void}) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const legendRowItem = L.DomUtil.create("div", "map-legend-item active");
        legendRowItem.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick?.(legendRowItem);
        })
        legendRowItem.addEventListener("dblclick", (e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick?.(legendRowItem);
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

type LegendDescriptionValue = {
    text: string;
    img: string;
}

type LegendDescription = {
    [key: keyof EstablishmentLayers]: LegendDescriptionValue
}

type BuildMapLegendProps = {
    map: Map,
    layers: EstablishmentLayers
    position?: ControlPosition,
    legendDescriptions?: LegendDescription,
    onFilter?: (map: Map, layers: EstablishmentLayers, element: HTMLDivElement, layerKey: keyof EstablishmentLayers) => void
}

/**
 * Filter the layer on the map.
 * By default, use the OR operator to filter layers.
 * The logic of this function could be overridden by passing the onFilter argument to the buildMapLegend function.
 * @param map
 * @param layers
 * @param element
 * @param layerKey
 */
function defaultOnFilter(map: Map, layers: EstablishmentLayers, element: HTMLDivElement, layerKey: keyof EstablishmentLayers){
    const show = element.classList.toggle('active')
    if(show){
        map.addLayer(layers[layerKey])
        return
    }
    map.removeLayer(layers[layerKey])
}

/**
 * Build legend and add it to the provided map object.
 */
export function buildMapLegend({map, layers, position="bottomright", legendDescriptions=undefined, onFilter}: BuildMapLegendProps ) {
    const builder = mapLegendBuilder({title: "Map Legend Title"})
    const onLegendFilter = (element: HTMLDivElement, layerKey: keyof EstablishmentLayers) => {
        if(onFilter){
            onFilter(map, layers, element, layerKey)
            return
        }
        defaultOnFilter(map, layers, element, layerKey)
    }

    Object.keys(layers).forEach((key: keyof EstablishmentLayers) => {
        const desc = legendDescriptions?.[key]?.text ?? key
        const img = legendDescriptions?.[key]?.img
        const closeEstablishment = `
                ${img ? '<img src="'+ img+'" alt="'+ key +' icon' +'">' : ''}
                <p class="legend-text">${desc}</p>
            `
        builder.addLegendRow({html: closeEstablishment, onClick: (element: HTMLDivElement) =>  onLegendFilter(element, key)})
    })

    // Add legend to the given map
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const legendElement = L.control({position})
    legendElement.onAdd = builder.create
    legendElement.addTo(map);
}