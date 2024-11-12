'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function AdminUserInfo() {
  const [user, setUser] = useState({
    id: 'RXRWJD',
    serial_id: 1,
    tenant_id: '2W0Y46',
    first_name: 'Chris',
    last_name: 'Overstreet',
    role: 'owner',
    avatar_url: null,
    name: 'Chris Overstreet',
    initials: 'CO',
    created_at: '2024-11-11T18:44:15.319496+00:00',
    updated_at: '2024-11-11T18:44:15.319496+00:00',
    user_id: 'ca42de27-cf53-448b-a358-7012316e4aca',
    auth: {
      id: 'ca42de27-cf53-448b-a358-7012316e4aca',
      email: 'christopheroverstreet@gmail.com',
      phone: null,
      created_at: '2024-11-11T18:42:34.176691+00:00',
      updated_at: '2024-11-11T18:42:34.176691+00:00',
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAuthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      auth: {
        ...prevUser.auth,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated user data to your API
    console.log('Updated user data:', user);
  };

  return (
    <div className='container mx-auto'>
      <Card className='overflow-hidden'>
        <CardContent className='p-0'>
          <form onSubmit={handleSubmit} className='p-6 space-y-8'>
            {/*<div className='flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8'>*/}
            {/*  <Avatar className='w-24 h-24 border-4 border-primary'>*/}
            {/*    <AvatarImage*/}
            {/*      src={user.avatar_url || '/placeholder.svg?height=96&width=96'}*/}
            {/*      alt={user.name}*/}
            {/*    />*/}
            {/*    <AvatarFallback className='text-2xl'>*/}
            {/*      {user.initials}*/}
            {/*    </AvatarFallback>*/}
            {/*  </Avatar>*/}
            {/*  <div className='text-center sm:text-left'>*/}
            {/*    <h2 className='text-3xl font-bold text-primary'>{user.name}</h2>*/}
            {/*    <Badge variant='secondary' className='mt-2 text-sm'>*/}
            {/*      {user.role}*/}
            {/*    </Badge>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='first_name'>First Name</Label>
                <Input
                  id='first_name'
                  name='first_name'
                  value={user.first_name}
                  onChange={handleInputChange}
                  className='border-gray-300 focus:ring-primary focus:border-primary'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='last_name'>Last Name</Label>
                <Input
                  id='last_name'
                  name='last_name'
                  value={user.last_name}
                  onChange={handleInputChange}
                  className='border-gray-300 focus:ring-primary focus:border-primary'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  value={user.auth.email}
                  onChange={handleAuthInputChange}
                  className='border-gray-300 focus:ring-primary focus:border-primary'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='phone'>Phone</Label>
                <Input
                  id='phone'
                  name='phone'
                  value={user.auth.phone || ''}
                  onChange={handleAuthInputChange}
                  placeholder='No phone number'
                  className='border-gray-300 focus:ring-primary focus:border-primary'
                />
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='user_id'>User ID</Label>
              <Input
                id='user_id'
                value={user.user_id}
                readOnly
                className='bg-muted border-gray-300 focus:ring-primary focus:border-primary'
              />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='created_at'>Created At</Label>
                <Input
                  id='created_at'
                  value={new Date(user.created_at).toLocaleString()}
                  readOnly
                  className='bg-muted border-gray-300 focus:ring-primary focus:border-primary'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='updated_at'>Updated At</Label>
                <Input
                  id='updated_at'
                  value={new Date(user.updated_at).toLocaleString()}
                  readOnly
                  className='bg-muted border-gray-300 focus:ring-primary focus:border-primary'
                />
              </div>
            </div>
            <div className='mt-8'>
              <Button
                type='submit'
                className='w-full bg-primary hover:bg-primary/90 text-white'
              >
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
