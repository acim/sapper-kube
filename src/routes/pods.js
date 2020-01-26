import k8s from "@kubernetes/client-node";

const kc = new k8s.KubeConfig();
kc.loadFromCluster();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

export function get(req, res) {
  res.setHeader("Content-Type", "application/json");

  k8sApi
    .listPodForAllNamespaces()
    .then(r => {
      res.end(JSON.stringify(r.body.items));
    })
    .catch(err => {
      res.end(JSON.stringify({ error: err }));
    });
}
