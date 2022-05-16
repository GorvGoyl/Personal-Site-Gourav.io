---
title: "Block API requests via chrome extension - Manifest v2 and v3"
desc: "Dynamically block api requests in manifest v2 and v3 of chrome extension"
date: "2022-05-14"
toc: true
mobileToc: true
---

You can conditionally block specific API requests using a chrome extension. I'll be using new chrome extension API [declarativeNetRequest](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest) instead of deprecated [webRequest](https://developer.chrome.com/docs/extensions/reference/webRequest/).

## `declarativeNetRequest` vs `webRequest`

There are 2 APIs one can use to block/unblock/redirect/modify header of API requests:

**`declarativeNetRequest`**

- available for Chrome (both Manifest v2 and v3)
- not available for Firefox Manifest v2 but will be for Manifest v3 ([track progress](https://bugzilla.mozilla.org/show_bug.cgi?id=1687755))

**`webRequest`**

- available for Chrome Manifest v2 but deprecated in Manifest v3
- available for Firefox Manifest v2 and will be supported in Manifest v3 as well ([reference](https://blog.mozilla.org/addons/2021/05/27/manifest-v3-update/#:~:text=we%20have%20decided%20to%20implement%20DNR%20and%20continue%20maintaining%20support%20for%20blocking%20webRequest))

more detailed comparison: https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#comparison-with-the-webrequest-api

As you can see, `declarativeNetRequest` seems to be more future-proof when developing browser extensions for both browsers (Chrome and Firefox)

Let's jump right into the implementation!

## Dynamically block/unblock URLs

It means you can conditionally block/unblock any API request at anytime

in `manifest.json` file, add `declarativeNetRequest` permission:

```json
{
  "permissions": [
    "*://example.com/*", // mention domain(s) where declarativeNetRequest should run
    "declarativeNetRequest"
  ]
}
```

Add below to [background script](https://developer.chrome.com/docs/extensions/mv2/background_pages/) for Manifest v2 extension, or to [service worker](https://developer.chrome.com/docs/extensions/mv3/migrating_to_service_workers/) for Manifest v3 extension:

Below snippet blocks API requests that start with `adservice.google.com/adsid/google/ui` on domain: `example.com`

```js
const adblockRuleID = 2; // give any id to indetify the rule but must be greater than 1
chrome.declarativeNetRequest.updateDynamicRules(
  {
    addRules: [
      {
        action: {
          type: "block",
        },
        condition: {
          urlFilter: "adservice.google.com/adsid/google/ui", // block URLs that starts with this
          domains: ["example.com"], // on this domain
        },
        id: adblockRuleID,
        priority: 1,
      },
    ],
    removeRuleIds: [adblockRuleID], // this removes old rule if any
  },
  () => {
    console.log("block rule added");
  }
);
```

To unblock a rule:

```js
chrome.declarativeNetRequest.updateDynamicRules(
  {
    removeRuleIds: [adblockRuleID], //invalid and non-existing rules will be ignored
  },
  () => {
    console.log("rule removed");
  }
);
```

Few notes:

- you can at most create 5000 such rules ([reference](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#property-MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES)). An average adblocker extension needs 70,000+ rules to block most ads effectively. A default installation of the uBlock Origin extension comes with 100,000 rules. So yes, this will handicap adblocker extensions.
- The rules with IDs listed in `removeRuleIds` are first removed, and then the rules given in `addRules` are added.
- These rules are persisted across browser sessions and extension updates.
- You can perform other actions as well like modifying api header, redirecting URL, etc. see [docs](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#matching-algorithm).
- pattern matching is also supported for `urlFilter`. see [docs](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#:~:text=session%2Dscoped%20rules.-,urlFilter,-string%C2%A0optional).
- To block WebSockets, mention url with `wss://` protocol ex: `urlFilter: "wss://augloop.office.com"`

## Statically block URLs

It means all the APIs and their rules must be defined beforehand in a `rules.json` file, and that file must be referenced in `manifest.json`.

`manifest.json`:

```json
{
  "name": "declarativeNetRequest extension",
  "version": "1",
  "declarative_net_request": {
    "rule_resources": [
      {
        "id": "ruleset_1",
        "enabled": true,
        "path": "rules.json"
      }
    ]
  },
  "permissions": [
    "*://*.google.com/*",
    "*://*.abcd.com/*",
    "*://*.example.com/*",
    "https://*.xyz.com/*",
    "*://*.headers.com/*",
    "declarativeNetRequest"
  ],
  "manifest_version": 2
}
```

`rules.json`:

```json
[
  {
    "id": 1,
    "priority": 1,
    "action": { "type": "block" },
    "condition": { "urlFilter": "google.com", "resourceTypes": ["main_frame"] }
  },
  {
    "id": 2,
    "priority": 1,
    "action": { "type": "allow" },
    "condition": {
      "urlFilter": "google.com/123",
      "resourceTypes": ["main_frame"]
    }
  },
  {
    "id": 3,
    "priority": 2,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "google.com/12345",
      "resourceTypes": ["main_frame"]
    }
  },
  {
    "id": 4,
    "priority": 1,
    "action": {
      "type": "redirect",
      "redirect": { "url": "https://example.com" }
    },
    "condition": { "urlFilter": "google.com", "resourceTypes": ["main_frame"] }
  },
  {
    "id": 5,
    "priority": 1,
    "action": { "type": "redirect", "redirect": { "extensionPath": "/a.jpg" } },
    "condition": { "urlFilter": "abcd.com", "resourceTypes": ["main_frame"] }
  },
  {
    "id": 6,
    "priority": 1,
    "action": {
      "type": "redirect",
      "redirect": {
        "transform": { "scheme": "https", "host": "new.example.com" }
      }
    },
    "condition": {
      "urlFilter": "||example.com",
      "resourceTypes": ["main_frame"]
    }
  },
  {
    "id": 7,
    "priority": 1,
    "action": {
      "type": "redirect",
      "redirect": {
        "regexSubstitution": "https://\\1.xyz.com/"
      }
    },
    "condition": {
      "regexFilter": "^https://www\\.(abc|def)\\.xyz\\.com/",
      "resourceTypes": ["main_frame"]
    }
  },
  {
    "id": 8,
    "priority": 2,
    "action": {
      "type": "allowAllRequests"
    },
    "condition": {
      "urlFilter": "||b.com/path",
      "resourceTypes": ["sub_frame"]
    }
  },
  {
    "id": 9,
    "priority": 1,
    "action": {
      "type": "block"
    },
    "condition": {
      "urlFilter": "script.js",
      "resourceTypes": ["script"]
    }
  },
  {
    "id": 10,
    "priority": 2,
    "action": {
      "type": "modifyHeaders",
      "responseHeaders": [
        { "header": "h1", "operation": "remove" },
        { "header": "h2", "operation": "set", "value": "v2" },
        { "header": "h3", "operation": "append", "value": "v3" }
      ]
    },
    "condition": {
      "urlFilter": "headers.com/123",
      "resourceTypes": ["main_frame"]
    }
  },
  {
    "id": 11,
    "priority": 1,
    "action": {
      "type": "modifyHeaders",
      "responseHeaders": [
        { "header": "h1", "operation": "set", "value": "v4" },
        { "header": "h2", "operation": "append", "value": "v5" },
        { "header": "h3", "operation": "append", "value": "v6" }
      ]
    },
    "condition": {
      "urlFilter": "headers.com/12345",
      "resourceTypes": ["main_frame"]
    }
  }
]
```

Few notes:

- You can at max create 30,000 such static rules ([reference](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#property-GUARANTEED_MINIMUM_STATIC_RULES)).
- There's also a global quota of static rules shared between all extensions and can be used by extensions on a first-come, first-served basis. Global quota is not yet documented, but it's rumored to be around ~150,000 rules.
