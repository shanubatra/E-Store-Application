export async function addRecord(payload) {
  let response = await fetch("http://localhost:8000/comment", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
}
export async function getRecord() {
  let response = await fetch("http://localhost:8000/comment", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  return await response.json();
}

export async function deleteRecord(payload) {
  let response = await fetch("http://localhost:8000/comment/" + payload.id, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  return response.json();
}
