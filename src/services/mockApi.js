export function getCommunities() {
  return [
    { id: 1, name: "Women in Tech SA" },
    { id: 2, name: "AI Founders" },
  ];
}

export function getMentors() {
  return [
    { id: 1, name: "Thandi Ndlovu", expertise: "Cybersecurity" },
    { id: 2, name: "Aisha Khan", expertise: "AI & Machine Learning" },
  ];
}

export async function sendSosAlert(payload) {
  console.log("SOS Payload:", payload);
  return new Promise((resolve) => setTimeout(resolve, 1000));
}
