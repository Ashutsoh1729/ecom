"use client";

const LoginModal = () => {
  return (
    <div>
      <h2 className="text-xl font-bold">Login to Your Account</h2>
      <p className="mt-4">Please enter your credentials below.</p>
      {/* Your form would go here */}
    </div>
  );
};

const EditProfileModal = () => {
  return (
    <div>
      <h2 className="text-xl font-bold">Edit Your Profile</h2>
      <p className="mt-4">Update your user information.</p>
      {/* Your profile editing form would go here */}
    </div>
  );
};

export { LoginModal, EditProfileModal };
