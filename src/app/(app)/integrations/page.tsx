import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { ChannelIcon } from "@/components/channel-icon";

const integrations = [
    { name: "Twilio SMS", channel: "sms", connected: true },
    { name: "Twilio WhatsApp", channel: "whatsapp", connected: true },
    { name: "Resend Email", channel: "email", connected: false },
    { name: "Twitter / X", channel: "twitter", connected: false },
    { name: "Facebook Messenger", channel: "facebook", connected: false },
];

export default function IntegrationsPage() {
  return (
    <div className="p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Channel Integrations</CardTitle>
          <CardDescription>Connect and manage your communication channels.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrations.map(int => (
                <Card key={int.name}>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <ChannelIcon channel={int.channel} className="w-8 h-8 text-muted-foreground" />
                            <div>
                                <p className="font-semibold">{int.name}</p>
                                <p className={`text-sm ${int.connected ? 'text-green-600' : 'text-muted-foreground'}`}>
                                    {int.connected ? 'Connected' : 'Not Connected'}
                                </p>
                            </div>
                        </div>
                        <Button variant={int.connected ? 'destructive' : 'default'}>
                            {int.connected ? 'Disconnect' : 'Connect'}
                        </Button>
                    </CardContent>
                </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
