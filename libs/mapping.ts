"use client";

import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import config from "next/config";

interface MapApp {
  view?: MapView;
  map?: ArcGISMap;
  layer?: FeatureLayer;
  savedExtent?: any;
}

const app: MapApp = {};

export async function init(container: HTMLDivElement) {
  if (app.view) {
    app.view.destroy();
  }

  const layer = new FeatureLayer({
    portalItem: {
      id: "eef3369ef46b451dbff4b8283c370ed5",
    },
  });

  const map = new ArcGISMap({
    basemap: "topo-vector",
    layers: [layer],
  });

  const view = new MapView({
    map,
    container,
    center: [-75.5743617, 6.2486307],
    zoom: 1,
  });

  const trailsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
  });

  const trailheadsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
  });

  const parksLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
  });

  map.add(trailsLayer, 0);
  map.add(trailheadsLayer);
  map.add(parksLayer, 0);

  app.view = view;
  app.map = map;
  app.layer = layer;

  return cleanup;
}

function cleanup() {
  app.view?.destroy();
}
