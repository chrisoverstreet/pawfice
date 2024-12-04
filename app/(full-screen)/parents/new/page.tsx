import NewParentForm from '@/components/parents/new/new-parent-form';

export default async function NewParentPage() {
  return (
    <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='mb-8'>
        <h1 className='text-2xl font-semibold text-content'>Add New Parent</h1>
        {/* TODO better description */}
        <p className='mt-2 text-muted'>Create a new parent profile</p>
      </div>

      <NewParentForm />
    </div>
  );
}
