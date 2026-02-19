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
              <p className="text-foreground font-semibold text-base">
                Npd collects location data to enable location-based task reminders even when the app is closed or not in use.
              </p>
              <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                <p className="font-medium text-foreground flex items-center gap-2">
                  <Shield className="h-4 w-4" /> How your location data is used:
                </p>
                <ul className="list-disc list-inside space-y-1.5 ml-1">
                  <li><strong className="text-foreground">What data is collected:</strong> Precise (GPS) location data</li>
                  <li><strong className="text-foreground">Why it is collected:</strong> To detect when you enter or leave a location linked to a task, so the app can send you a reminder notification</li>
                  <li><strong className="text-foreground">How it is used:</strong> Your location is continuously compared on-device against the geofence coordinates you set for your tasks. When you enter or leave a geofenced area, a local notification is triggered. This is the <strong className="text-foreground">only</strong> use of your location data</li>
                  <li><strong className="text-foreground">Background usage:</strong> Location is accessed <strong className="text-foreground">in the background (when the app is closed or not in use)</strong> to ensure reminders work even if you are not actively using the app</li>
                  <li><strong className="text-foreground">Storage:</strong> Location data is processed in real-time on your device and is <strong className="text-foreground">not stored, logged, uploaded, or saved</strong> anywhere</li>
                  <li><strong className="text-foreground">Sharing:</strong> Location data is <strong className="text-foreground">never</strong> sent to any server, third party, advertiser, or analytics service</li>
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
