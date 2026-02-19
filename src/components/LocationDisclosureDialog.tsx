import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { MapPin, Shield } from 'lucide-react';
import { getSetting, setSetting } from '@/utils/settingsStorage';

interface LocationDisclosureDialogProps {
  open: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export const LocationDisclosureDialog = ({
  open,
  onAccept,
  onDecline,
}: LocationDisclosureDialogProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <AlertDialogTitle className="text-lg">
              Background Location Access
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription asChild>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Npd collects your device's precise location data, including in the background,</strong> to power location-based task reminders.
              </p>
              <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                <p className="font-medium text-foreground flex items-center gap-2">
                  <Shield className="h-4 w-4" /> Location data: what, why, and how
                </p>
                <ul className="list-disc list-inside space-y-1.5 ml-1">
                  <li><strong className="text-foreground">What we collect:</strong> Your device's precise GPS location (foreground and background)</li>
                  <li><strong className="text-foreground">Why we collect it:</strong> To detect when you arrive at or leave a place you've linked to a task reminder</li>
                  <li><strong className="text-foreground">How we use it:</strong> Your location is compared on-device against the geofence areas you set for your tasks. When you enter or leave one of those areas, the app sends you a local notification. That is the <strong className="text-foreground">only</strong> use of your location data</li>
                  <li><strong className="text-foreground">Storage:</strong> Location data is processed in real-time on your device and is <strong className="text-foreground">not stored, logged, or saved</strong> anywhere</li>
                  <li><strong className="text-foreground">Sharing:</strong> Your location data is <strong className="text-foreground">never</strong> sent to any server, third party, advertiser, or analytics service</li>
                </ul>
              </div>
              <p>
                You can disable location reminders at any time from task settings, which will immediately stop all location access. You can also revoke location permissions from your device's system settings.
              </p>
              <p className="text-xs">
                By tapping "Allow", you consent to the collection and use of your location data as described above. See our{' '}
                <a href="https://docs.google.com/document/d/1YY5k6mXOKJtiZjEb9ws6Aq7UQbStGy-I/edit?usp=drivesdk&ouid=105643538765333343845&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer" className="text-primary underline">Privacy Policy</a> for more details.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onDecline}>
            No Thanks
          </AlertDialogCancel>
          <AlertDialogAction onClick={onAccept}>
            Allow Location Access
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Helper to check if disclosure has been accepted
export const hasAcceptedLocationDisclosure = async (): Promise<boolean> => {
  return await getSetting<boolean>('location_disclosure_accepted', false);
};

export const setLocationDisclosureAccepted = async (): Promise<void> => {
  await setSetting('location_disclosure_accepted', true);
};
