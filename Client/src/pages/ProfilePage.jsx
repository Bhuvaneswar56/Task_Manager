
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import API_INSTANCE from '../services/api';

function ProfilePage() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await API_INSTANCE.get('/auth/me');
                setUser(response.data.data);
            } catch (error) {
                toast.error('Failed to fetch profile');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (isLoading) {
        return <div className="text-center py-10">Loading profile...</div>;
    }

    if (!user) {
        return <div className="text-center py-10">Failed to load profile</div>;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
                
                <div className="space-y-4">
                    <div>
                        <h2 className="text-sm font-medium text-gray-500">Name</h2>
                        <p className="mt-1 text-lg text-gray-900">{user.name}</p>
                    </div>

                    <div>
                        <h2 className="text-sm font-medium text-gray-500">Email</h2>
                        <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                    </div>

                    <div>
                        <h2 className="text-sm font-medium text-gray-500">Member Since</h2>
                        <p className="mt-1 text-lg text-gray-900">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;