import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function ContactsPage() {
  return (
    <div className="p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-2xl font-bold font-headline">Coming Soon</h3>
            <p className="text-muted-foreground mt-2">
              A dedicated space to manage all your contacts is being built.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
