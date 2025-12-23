"use client"

import { useUser, UserButton } from '@clerk/nextjs';
import { IdeaGenerator } from './product';
import { PricingTable } from '@clerk/nextjs';

export default function AppPage() {
    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="text-gray-600">Loading...</div>
            </main>
        );
    }

    if (!isSignedIn) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Sign in to access the app</h1>
                    <p className="text-gray-600">You need to be logged in to use this feature.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="absolute top-4 right-4">
                <UserButton showName={true} />
            </div>
            <IdeaGenerator />
        </main>
    );
}
