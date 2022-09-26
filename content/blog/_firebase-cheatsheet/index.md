---
title: "Firebase cheatsheet - handy commands and tips"
desc: ""
date: "2022-06-04"
toc: true
mobileToc: true
---

## Environmental Variables

### Add

`firebase functions:config:set sendgrid.key="afirf"`

note: `sendgrid.key` must be lowercase

deploy once after setting, when you deploy function it'll be sent along with deployment.

### Load env vars for local development

Note: Firebase will use vars from this file instead of environment only when running the project locally.

`firebase functions:config:get | Set-Content .runtimeconfig.json` (powershell)

### Remove env var

`firebase functions:config:unset key1 key2`

### See all vars in terminal

`firebase functions:config:get`

### Copy all env vars to local file

`firebase functions:config:get | Set-Content .runtimeconfig.json` (powershell)

### Use env var in code

`const key = functions.config().sendgrid.key`

### Clone env from other project

`firebase functions:config:clone --from <fromProject>`

- https://firebase.google.com/docs/functions/config-env
- https://firebase.google.com/docs/functions/local-emulator
- Accept JSON file for functions:config:set: https://github.com/firebase/firebase-tools/issues/406
- setup local environment variables for Cloud Functions:
  - https://medium.com/firelayer/deploying-environment-variables-with-firebase-cloud-functions-680779413484
  - https://stackoverflow.com/q/44766536/3073272

## Work with multiple Firebase projects

### Setup

- create new project at `console.firebase.com`
- add that project using `firebase use --add`
- give some name i.e. dev/prod

### List all projects

`firebase projects:list`

### Check which project is initialised

`firebase use`

### Switch to specific project to debug and deploy

`firebase use prod`

### Deploy to specific project w/o switching

`firebase deploy -P prod --only hosting`

Read more: https://firebase.google.com/docs/cli#project_aliases

## Multiple sites in same project

### Setup

set `app` as alias for `my-firebase-app` (firebase site name):

`firebase target:apply hosting app my-firebase-app`

### Use

deploy to `app`:

`firebase deploy --only hosting:app`

## Run Firebase

### To run hosting + functions

`firebase serve` // to run hosting + functions

### Run only functions

- `firebase serve --only functions`
- `firebase emulators:start --only functions`
-

### Open Firebase site in mobile

1. `firebase serve --host 0.0.0.0`
2. Find IP address of your desktop
3. Enter IP address:firebase_site_port in mobile

### Firebase emulator

- `firebase emulators:start`
- `firebase emulators:start --only functions`

### Connect with local Firestore

To point to local firestore, add below to firebase.json `emulators` config:

```json
 "firestore": {
  "port": 8080
  }
```

## Debug Functions

### debug in VSCode (add breakpoints)

ref: https://stackoverflow.com/a/59077802/3073272

1. Update firebase-tools to atleast v7.11.0 `npm i -g firebase-tools`
2. Add below to `.vscode/launch.json` (create file if not present):
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "type": "node",
         "request": "attach",
         "name": "Attach",
         "port": 9229,
         "restart": true,
         "skipFiles": ["<node_internals>/**"]
       }
     ]
   }
   ```
3. If typescript project, then compile first: `tsc`
4. Start emulator
   - `firebase emulators:start --only "functions,hosting" --inspect-functions`
   - `firebase emulators:start --only functions --inspect-functions`
5. Run the VSCode debugger with `Attach` option
6. put breakpoint in a cloud function.
7. Call that function (ex: http://localhost:5001/your_project/us-central1/helloWorld). Breakpoint should hit.

Note: Support for PubSub/Scheduled functions is still not implemented. Upvote this issue: https://github.com/firebase/firebase-tools/issues/2034

### Debug deployed functions

- see logs at https://console.cloud.google.com/logs/viewer
- check deployed function code in lib/ and on cloud
- deploy with `--debug` command and see logs

- see logs of deployed functions in vscode console:

`firebase functions:log --only <method name>` //for specific function

`firebase functions:log` //for all functions

`firebase help functions:log` //see help

## Deploy

### deploy only hosting

`firebase deploy --only hosting`

### deploy only functions

`firebase deploy --only functions`

### deploy ceetain functions

`firebase deploy --only "functions:function1,functions:function2"`

### deploy functions+hosting

`firebase deploy --only functions,hosting`

### deploy to certain environment

`firebase deploy -P dev --only hosting`

## Rename deployed function

Deploy new function called `webhookNew`:

`firebase deploy --only functions:webhookNew`

Wait until deployment is done; now both `webhookNew` and `webhook` are running

Delete `webhook`:

`firebase functions:delete webhook`

# Firestore Backup Export / Import

## within same GCP

**create gcp bucket:**

- visit: https://console.cloud.google.com/firestore/import-export
- export -> choose destination -> icon (create new bucket) ->
  - give name
  - default storage class: nearline (as it's for backup)
  - create

## Export data manually

- visit: https://console.cloud.google.com/firestore/import-export
- export entire database -> choose destination -> select a bucket -> done

- while exporting you need to mention both collections and subcollections

## Export data on schedule

- write a firebase schedule function

## Import data

- in case of importing all collections: It'll override all data.. existing data will be removed first
- if importing specific collection then only those collections will be overwritten.

- visit: https://console.cloud.google.com/firestore/import-export
- import -> select bucket -> select folder -> select `***_export_metadata` file -> done

---

https://firebase.google.com/docs/firestore/manage-data/move-data

Option 0: use some firebase gui tool

Option 1:

- use firebase import-export tool
- https://stackoverflow.com/a/68092944/3073272

Option 2:

(At source)

- [one time] create a bucket in same location as firestore https://console.cloud.google.com/storage/browser
  - settings: multi-region, standard, non-public, rest all default
- Export Data..

  - run command in cloud shell https://console.cloud.google.com/home/dashboard?project=my-project-dev&cloudshell=true
  - `gcloud firestore export gs://my-project-prod-firestore-migrate --async`
  - note down `outputUriPrefix` date string: `2021-08-19T21:12:43_66453`
  - check status: `gcloud firestore operations list`

- Give permission to destination to access source bucket (required when migrating b/w different accounts)

```

gsutil iam ch serviceAccount:[DESTINATION_PROJECT_ID]@appspot.gserviceaccount.com:admin \
gs://[SOURCE_BUCKET]

```

(At destination)

- open cloud shell at destination and run
  - `gcloud firestore import gs://my-project_prod-firestore-migrate/2021-08-19T21:12:43_66453 --async`
  - check status.

# Firebase extensions

https://firebase.google.com/products/extensions#explore

- delete user data

- stripe integrations
  https://github.com/stripe/stripe-firebase-extensions/

# LONG RUNNING TASKS

my q on reddit: https://www.reddit.com/r/Firebase/comments/o93cr4/right_approach_for_scheduled_long_running/

## scheduled cloud functions with retry enabled

https://cloud.google.com/scheduler/docs/reference/rpc/google.cloud.scheduler.v1#retryconfig

- take account for parallel execution
- use built-in `context.eventId` and `timestamp`
  - https://cloud.google.com/functions/docs/writing/background
  - https://firebase.google.com/docs/reference/functions/cloud_functions_.eventcontext
  - retries: https://cloud.google.com/functions/docs/bestpractices/retries

## cloud run

pricing: https://cloud.google.com/run/pricing

timeout: 60 minutes (retries available)
https://cloud.google.com/run/docs/configuring/request-timeout

## App engine standard

pricing: https://cloud.google.com/appengine/quotas

timeout: 24 hours

approach:

https://www.reddit.com/r/Firebase/comments/cjf4wo/execute_long_running_tasks_with_progress_sent_to/

1. worker:
   use `App Engine Standard`, the scaling is allowed to scale down to 0 instances, so you're not being charged
   alt: `cloud run`

2. task queue:
   whenever you publish a task `Cloud Task` Queues, the App Engine worker will spin up do the work.
   alt: use `bg trigger functions` like on firebase write, `schedule cloud functions`

3. A publisher:
   simply publish to `Cloud Task` Queues from a `Firebase function`.

## app engine

# cron jobs alt

- https://workers.cloudflare.com/ (free)
- from vercel marketplace, nextjs integration:
  - https://vercel.com/integrations/easycron
  - https://vercel.com/integrations/gcloud

## scheduled cloud functions - fixed interval [new way]

(It's a wrapper over Cloud Scheduler + Pub/Sub)
docs: https://firebase.google.com/docs/functions/schedule-functions

quota: (for all types of firebase functions)
https://firebase.google.com/docs/functions/quotas

change settings: https://console.cloud.google.com/functions/

- max ram/func call: 8GB (default: 256mb)
- max timeout/func call: 9 minutes (default: 60s) (alt: see long running tasks section)
- instances: auto (default) / manual

pricing
costs for this feature are the same as if you set up the underlying infrastructure manually (Cloud Scheduler and Pub/Sub)

- Cost /func/month - $0.10
- Free func/month 3

tuts: https://fireship.io/lessons/cloud-functions-scheduled-time-trigger/

intro: https://firebase.googleblog.com/2019/04/schedule-cloud-functions-firebase-cron.html

## scheduled tasks (arbitrary time)

### using cloud tasks + cloud functions

- https://cloud.google.com/tasks/docs/tutorial-gcf
- https://medium.com/firebase-developers/how-to-schedule-a-cloud-function-to-run-in-the-future-in-order-to-build-a-firestore-document-ttl-754f9bf3214a

- call cloud function on scheduled time from cloud task

pricing: 1mil/mo tasks are free

#### commands

- install https://cloud.google.com/sdk/docs/downloads-interactive
- create queue: `gcloud tasks queues create firestore-ttl`

### scheduled cloud functions + firestore

- save payload in firestore
- schedule cloud function (every X time) which will read payload from firestore and execute.

#### background cloud function

- which is triggered when creating a document in firestore

## cron jobs [old ways]

### trigger background functions

quota: https://firebase.google.com/docs/functions/quotas#additional_quotas_for_background_functions

#### use pubsub

#### google cloud tasks

- pricing : https://cloud.google.com/tasks/pricing

  - First 1 Million - Free
  - Up to 5 billion - $0.40

- tuts: https://cloud.google.com/docs/tutorials#Cloud%20Tasks%20schedul

Using Cloud Tasks to trigger Cloud Functions: https://cloud.google.com/tasks/docs/tutorial-gcf

comparison with pub/sub and scheduler:

- cloud tasks vs pub/sub: https://cloud.google.com/tasks/docs/comp-pub-sub
- cloud tasks vs cloud scheduler: https://cloud.google.com/tasks/docs/comp-tasks-sched

#### cloud scheduler

- either run code in it or
- call call separate cloud function which would run code
- Also supports calling App Engine, Cloud Pub/Sub, and arbitrary HTTP endpoints,

pricing

- Cost/job/month - $0.10
- Free jobs/month 3

### Firebase cloud func vs cloud run

- https://firebase.google.com/docs/hosting/serverless-overview#choosing_a_serverless_option

# FIRESTORE

- learn: https://youtu.be/o7d5Zeic63s , https://youtu.be/haMOUb3KVSo
- quota: https://firebase.google.com/docs/firestore/quotas
- data types: https://firebase.google.com/docs/firestore/manage-data/data-types
- store data homogenously
- config setting: https://firebase.google.com/docs/reference/js/firebase.firestore.Settings

- you can run query on a single collection or a group of collections with same name.
  there's no way to fetch data of a parent collection based on some subcollection clause.
  you need to make second call to fetch parent doc based on the output of subcollection query data.

- `OR` condition involving multiple fields of a doc is not supported i.e. get all where `isPaid==true` OR `isTrial==true`. you need to make two calls and dedup on client.
- `OR` condition on a single doc field is supported. ex:
  1. `.where('status', 'in', ['open', 'upcoming'])`.
  2. `.where('status','<=', 2)` , use `enum` to assign int values to open=1, upcoming=2, etc.

## query Firestore

- get subcollection inside a doc:
  `await firestore.collection("users").doc("5SUu8QzDQmfvIEej8Ah4zqq").collection("workflows").get();`

## ways to structure data

https://firebase.google.com/docs/firestore/manage-data/structure-data

- `doc.property`,
- `doc.array["a","b"]`
- `doc.map{a:1,b:2}`
- `doc -> subcollection-> more docs`
- `top level collection -> docs`

- put all data in doc which you want to retrieve at one shot.
- queries are shallow. return result doesn't include `subcollection` docs.
- cant retrieve partial doc

## read query - stats

- time it takes to run a query is proportional to no. of results you get back, _not the number of docs you're searching through_ becuz of index so query will return in same time if docs in firestore are 1k or 100k
  index:
- firestore auto-creates index for every doc and every field inside a doc even `map` objects

## store data

- `.add(...)` and `.doc().set(...)` are completely equivalent

## atomicity

- `batch update`
  when you want to update multiple docs in multiple collections.
  either all should be updated or update none in case of any failure.
  use if you don't care about the old values being stale while doing batch updates. if you care use transactions
- max docs write in a batch update: 500

- `transcations`
  when entering transaction mode and updating something back:
  _cleint side transaction_(i.e. mobile, web)
  if the doc hasn't changed outside, then update the doc
  else fetch the latest doc and re-perform the entire transaction. it'll keep looping it untill success.
  so, it'll make sure you're processing with the upto date data _without locking any db writes_.
  queries aren't allowed, you can only read individual docs.
  algo: optimistic concurrency control

## bulk writes

Writing 1,000 documents to Firestore takes:

- 105.4s when using sequential individual write operations (`while loop->await`) (10 document writes per second)
- 2.8s when using (2) batched write operations (`batch.commit()`)
- 1.5s when using parallel individual write operations (`Promise.all` / `Promise.allSettled`)

`promiseAll`: output halted on first promise reject
`Promise.allSettled`: wait for all promises to execute even if some fails
add answer to https://stackoverflow.com/q/31424561/3073272

_server side transaction_(node)
it locks the db for any writes while its making a transactions
you can use queries during the read-part of transaction
algo: pessimistic concurrency control

rules for transaction:

- do all reads first then all writes
- transactions could re-perform so make sure the code is taken account of it.
- as transaction will fail if any of the used docs has updated so use docs only that are required.
- max docs write in a transaction: 500

## listen to realtime updates

https://firebase.google.com/docs/firestore/query-data/listen
listen to single doc: `doc.onSnapshot()`
listen to multiple docs in a collection: `query.onSnapshot()`

## limits

- for a specific doc: max 1 write/second, doc write updates entire doc. To support more frequent updates: https://firebase.google.com/docs/firestore/solutions/counters
- max doc size = 1mb
- max docs inside a collection = infinite
- max fields inside docs: 20k including `map`, `array` fields
- Subcollections can be up to 100 levels deep.

## collections

- You do not need to "create" or "delete" collections. it gets created/deleted along with doc.
- Deleting a document does not delete its `subcollections`!
  when deleting a parent document, you need to seperately delete documents in subcollections
  https://firebase.google.com/docs/firestore/manage-data/delete-data#node.js_2

## subcollections

- https://firebase.google.com/docs/firestore/data-model#hierarchical-data
- get data from subcollection:
  `var messageRef = db.collection('rooms').doc('roomA').collection('messages').doc('message1');`
- A collection group consists of all collections with the same ID.
- Use a collection group query to retrieve documents from a collection group
  instead from a single collection.
  https://firebase.google.com/docs/firestore/query-data/queries#collection-group-query
  (Before using a collection group query, you must create an index that supports your collection group query.
  https://firebase.google.com/docs/firestore/query-data/indexing)

```js
const querySnapshot = await db
  .collectionGroup("landmarks")
  .where("type", "==", "museum")
  .get();
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
});
```

## ORMS

- https://github.com/wovalle/fireorm/
- https://github.com/kossnocorp/typesaurus
- https://github.com/kafkas/firecode (collection traversal library )
- https://github.com/yarnaimo/fireschema (frontend)

# Time in Firestore / JS

## store timestamp

- method: https://firebase.google.com/docs/reference/node/firebase.firestore.Timestamp
- internal implementation: https://github.com/googleapis/nodejs-firestore/blob/master/dev/src/timestamp.ts
- to store custom timestamp inside a doc property:
  `lastRun: admin.firestore.Timestamp.fromDate(new Date('December 10, 1815'))`
- to store created date:
  `createdAt: admin.firestore.FieldValue.serverTimestamp()`
- convert to js date: https://firebase.google.com/docs/reference/node/firebase.firestore.Timestamp#todate

## first date

(below all are equal)

# lastRun = new Date(Date.UTC(0, 0, 0, 0, 0, 0));

# Sun Dec 31 1899 05:21:10 GMT+0521 (India Standard Time)

`{"_seconds":-2209075200,"_nanoseconds":0}`

## ISO 8601 = RFC3339 = Zulu

- `ISO8601` is equal to `RFC3339`, only difference is RFC allows us to replace “T” with “space”)

- Always store any date time in iso/rfc format.

```js
// returns time object but always includes browser/server timezone
new Date(); // Fri Jul 09 2021 17:09:40 GMT+0530 (India Standard Time)

//returns absolute time string - use this when dealing with time
new Date().toISOString(); // "2021-07-04T20:25:09.200Z"

//returns number as Unix timestamp i.e. number of milliseconds elapsed since January 1, 1970 00:00:00 UTC
Date.now(); // 1625908687630
```

here “Z” stands for Zulu timezone which is (UTC+0)

UTC = GMT (GMT is timezone for 0 offset of UTC)

- add offset to isostring format
  https://stackoverflow.com/a/17415677/3073272
  https://stackoverflow.com/a/49332027/3073272

## Time in Notion & GCal API / iso with offset

```
- "8/17/2021, 3:45:00 PM" -> 2021-08-17T15:45:00.000+05:30 (it's still iso but with offset)
- "8/17/2021, 12:00:00 AM" -> 2021-08-17T00:00:00.000+05:30
```

```
2021-08-17T00:00:00.000+05:30 is equal to
2021-08-16T18:30:00.000Z
But don't directly compare it (=) in js, first remove the offset from 1st one.
```

## Ways to store date in Firestore

https://stackoverflow.com/a/68521264/3073272

-

# FIREORM

https://github.com/wovalle/fireorm/blob/2718c08b6031c3893d60b2db4e5a136bb44fe184/src/BaseFirestoreRepository.spec.ts#L669

- create/update subcollection
  `await workflowLog.workflowErrors?.create(workflowError);`

# Create new Firebase project

get from Firebase -> project settings -> Web API key
`NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=Aabcde-zJwkZgyU56NVilKs`
just replace with your [project id]

```makefile
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dashboard-my-project-dev.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://dashboard-my-project-dev.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=dashboard-my-project-dev
```

get from Firebase -> project settings -> Service Accounts -> json

`FIREBASE_CLIENT_EMAIL=firebase-adminsdk-3@dashboard-my-project-dev.iam.gserviceaccount.com`

# More Firebase resources

https://github.com/jthegedus/awesome-firebase
