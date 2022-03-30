/* eslint-disable object-curly-newline */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
/*
 * Copyright 2021 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable no-undef, @typescript-eslint/no-unused-vars, no-unused-vars */
import "./style.css";

import * as React from "react";
import * as ReactDom from "react-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { useEffect } from "react";
import useGlobal from "../../hooks/useGlobal";
// eslint-disable-next-line react/jsx-filename-extension
const render = (status: Status) => <h1>{status}</h1>;

const Maps: React.VFC = () => {
  const key: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";
  const { array, genericLocation, location, lastLocation } = useGlobal();
  const [clicks, setClicks] = React.useState<any>([]);
  const [zoom, setZoom] = React.useState(15);
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    setCenter({ lat: -9.0, lng: -35.0 });
    setZoom(15);
  }, []);

  const onClick = (e: google.maps.MapMouseEvent) => {
    setClicks([...clicks, e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  useEffect(() => {
    setClicks(genericLocation);
    setCenter(genericLocation[genericLocation.length - 1]);
  }, [genericLocation]);
  return (
    <div
      className="container-maps"
      style={{
        display: "flex",
        width: "314px",
        height: "40vh",
      }}
    >
      <Wrapper apiKey={key} render={render}>
        <Map
          center={center}
          // onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%" }}
        >
          {clicks.map((latLng, i) => (
            <Marker
              icon="https://lh3.googleusercontent.com/cV-6JiiXtw906J_oLqpZ9M7nHPDGgo6lQp_zsLuCN_y3ukuD7Bmeir-MNxGskI66GsH0NZyL2j4lvD797bhcOJuqWmaKnQSSJ4Fcsuoh465RnPe2kiRt45TSjkG2pF51DO7xvE2wMT7PJttuNvDBZiBWrq9eITGK_7aM9csmUOkVyWsRkdgCD2gEA1ClxyX4rhYvvsUrA6GwtdsPE5eO-xOrhN2mTjZtY6Vk3TNF070j8__nkbk4WnPgMKfy8fzFAXmFjb9IziITXipAubcx51R0JmPQTxznP9siBc5VsMoYwOabjCM_bbVT3J1fQ74mnsPUi-S02DQLzhyIGBv3E-a03WEpyisuq-a8qFgggl-D1NeHqG4FyPPZQ35EUk1MwQB8PDPtbzEvEsCfjqsOEbIRGleIDuBFKiA3w0kHmYikVZch245s8RyJoP9pKLcBfgCOK7Y8zlAr2vtj0_hqj0LHLSopZLMuYaGIzQnU5jQAzYLkQ-E824HD6684Ff3XzkU2kf6ugHYyiCGmPpK5SlFyzZ27P9apfiX79moHP5l82erS6Tvpf3XcdSkK8w4dj2_8HQZ8_Wb0_UrfykeTEasLhCtvLgTTpYjIpL0zBQBlq27H3JgFA-Yi1tUa0BQe0C95atPn_RkwMWnjFlNWNhBp7dOnVBNWWvJN3JVCsFuayshCd9fI_cnL8k4a9jWVtyv8L-nBoKpDeX78_rW_Ockk7gFGrMA3dOZO4fp2vNeQNvsxGHJ_KiWHKLzSd0uw-zNWvtP9iOEjZAemL97qvm5_jxzXDy0=s20-no?authuser=0"
              key={i}
              position={latLng}
            />
          ))}
        </Map>
      </Wrapper>
    </div>
  );
};
interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
      // marker.setIcon("mark");
    }
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default Maps;
