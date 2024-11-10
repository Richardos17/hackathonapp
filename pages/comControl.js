import { useState, useEffect } from "react";
import mqtt from "mqtt";

const LightingControl = () => {
  const [lightingStatus, setLightingStatus] = useState("OFF");
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Pripojenie k MQTT brokeru
    const mqttClient = mqtt.connect(
      "wss://3293aac8404344178826c86d38a69c49.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "Richard", // ak je potrebné
        password: "Richard1234", // ak je potrebné
      }
    ); // Používame WebSocket pripojenie
    setClient(mqttClient);

    mqttClient.on("connect", () => {
      console.log("MQTT pripojený");
    });

    mqttClient.on("error", (err) => {
      console.error("MQTT chyba:", err);
      mqttClient.end();
    });

    return () => {
      mqttClient.end(); // Zatvorenie pripojenia pri odchode z komponentu
    };
  }, []);

  const toggleLighting = () => {
    const newStatus = lightingStatus === "OFF" ? "ON" : "OFF";
    setLightingStatus(newStatus);

    if (client) {
      // Poslanie správy na MQTT topic pre osvetlenie
      client.publish("sports/facility/lighting", newStatus);
      console.log("Sent");
    }
  };

  return (
    <div>
      <h1>Lighting Status: {lightingStatus}</h1>
      <button onClick={toggleLighting}>
        {lightingStatus === "OFF" ? "Turn On Light" : "Turn Off Light"}
      </button>
    </div>
  );
};

export default LightingControl;
