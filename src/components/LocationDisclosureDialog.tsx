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
                <strong className="text-foreground">Npd uses your location in the background</strong> to deliver location-based task reminders even when the app is closed or not in use.
              </p>
              <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                <p className="font-medium text-foreground flex items-center gap-2">
                  <Shield className="h-4 w-4" /> How we use your location:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-1">
                  <li>To notify you when you arrive at or leave a location you set for a task reminder</li>
                  <li>Location data is processed <strong className="text-foreground">only on your device</strong></li>
                  <li>We do <strong className="text-foreground">not</strong> collect, store, or share your location data with any servers or third parties</li>
                </ul>
              </div>
              <p>
                You can disable location reminders at any time from task settings. Your location is never tracked for advertising or analytics purposes.
              </p>
              <p className="text-xs">
                By tapping "Allow", you consent to background location access for this feature. See our{' '}
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
