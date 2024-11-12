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
        protocol: "wss",
        username: "Richard", // ak je potrebné
        password: "Richard1234", // ak je potrebné// ak je potrebné
      }
    ); // Používame WebSocket pripojenie
    setClient(mqttClient);
    // Listen for messages on the topic
    
    mqttClient.on("connect", () => {
      console.log("MQTT pripojený");
    });
    mqttClient.subscribe("sports/facility/lighting", (err) => {
      if (err) {
        console.error("Subscription error:", err);
      } else {
        console.log("Subscribed to sports/facility/lighting for confirmation");
      }
    });
    mqttClient.on("message", (topic, message) => {
      console.log("Received message:", message);

      if (topic === "sports/facility/lighting") {
        const receivedMessage = message.toString();
        console.log("Received message:", receivedMessage);
      }
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
