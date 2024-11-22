import Layout from '@/Layouts/Layout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdateRestaurantInformationForm from './Partials/UpdateRestaurantInformationForm'
import UpdateDriverInformationForm from './Partials/UpdateDriverInformationForm.jsx'
import ConvertRoleForm from './Partials/ConvertRoleForm';
import Dashboard from "@/Pages/RestaurantViews/Dashboard.jsx";

export default function Edit({ mustVerifyEmail, status, categories, user }) {
    return (
        <Layout type={user.role}>
            <div className="mx-auto max-w-7xl space-y-6 lg:px-8 overflow-scroll">
                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                    { user.role === 'restaurant' ? (
                        <UpdateRestaurantInformationForm
                            user={user}
                            categories={categories}
                            className="max-w-xl"
                        />
                    ) : user.role === 'driver' ? (
                        <UpdateDriverInformationForm
                            user={user}
                        />
                    ) : (
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    )}
                </div>

                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                { user.role === 'customer' ? (
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <ConvertRoleForm className="max-w-xl" categories={categories} />
                    </div>
                ) : null }

                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </Layout>
    );
}
