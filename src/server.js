import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

// Test Kubernetes
const k8s = require("@kubernetes/client-node");

const kc = new k8s.KubeConfig();
kc.loadFromCluster();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

k8sApi
  .listNamespacedPod("default")
  .then(res => {
    console.log(res.body);
  })
  .catch(err => {
    console.log(err);
  });
//

express()
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .listen(PORT, err => {
    if (err) console.log("error", err);
  });
