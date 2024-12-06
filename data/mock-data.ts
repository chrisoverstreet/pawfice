import { addDays, format, subDays } from 'date-fns';

const today = new Date();

export const mockOwners = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '(555) 123-4567',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '(555) 987-6543',
  },
  {
    id: '3',
    name: 'Carlos Rodriguez',
    email: 'carlos@example.com',
    phone: '(555) 234-5678',
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    phone: '(555) 345-6789',
  },
  {
    id: '5',
    name: 'Michael Chen',
    email: 'michael@example.com',
    phone: '(555) 456-7890',
  },
] as const;

export const mockPets = [
  // John Smith's pets
  {
    id: '1',
    name: 'Max',
    type: 'dog',
    breed: 'Golden Retriever',
    age: 3,
    owner: mockOwners[0],
    imageUrl:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    name: 'Bella',
    type: 'dog',
    breed: 'Labrador',
    age: 2,
    owner: mockOwners[0],
    imageUrl:
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    name: 'Charlie',
    type: 'cat',
    breed: 'Maine Coon',
    age: 4,
    owner: mockOwners[0],
    imageUrl:
      'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&q=80',
  },

  // Sarah Johnson's pets
  {
    id: '4',
    name: 'Luna',
    type: 'cat',
    breed: 'Siamese',
    age: 2,
    owner: mockOwners[1],
    imageUrl:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80',
  },
  {
    id: '5',
    name: 'Oliver',
    type: 'cat',
    breed: 'Persian',
    age: 1,
    owner: mockOwners[1],
    imageUrl:
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80',
  },

  // Carlos Rodriguez's pets
  {
    id: '6',
    name: 'Rocky',
    type: 'dog',
    breed: 'German Shepherd',
    age: 5,
    owner: mockOwners[2],
    imageUrl:
      'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80',
  },
  {
    id: '7',
    name: 'Milo',
    type: 'dog',
    breed: 'Beagle',
    age: 3,
    owner: mockOwners[2],
    imageUrl:
      'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&q=80',
  },

  // Emma Wilson's pet
  {
    id: '8',
    name: 'Lucy',
    type: 'dog',
    breed: 'Poodle',
    age: 2,
    owner: mockOwners[3],
    imageUrl:
      'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?auto=format&fit=crop&q=80',
  },

  // Michael Chen's pets
  {
    id: '9',
    name: 'Cooper',
    type: 'dog',
    breed: 'Husky',
    age: 4,
    owner: mockOwners[4],
    imageUrl:
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&q=80',
  },
  {
    id: '10',
    name: 'Simba',
    type: 'cat',
    breed: 'Orange Tabby',
    age: 3,
    owner: mockOwners[4],
    imageUrl:
      'https://images.unsplash.com/photo-1494256997604-768d1f608cac?auto=format&fit=crop&q=80',
  },
] as const;

export const mockKennels = [
  { id: 'k1', name: 'K-01', type: 'small', location: 'Main Building' },
  { id: 'k2', name: 'K-02', type: 'small', location: 'Main Building' },
  { id: 'k3', name: 'K-03', type: 'medium', location: 'Main Building' },
  { id: 'k4', name: 'K-04', type: 'medium', location: 'Main Building' },
  { id: 'k5', name: 'K-05', type: 'large', location: 'Main Building' },
  { id: 'k6', name: 'K-06', type: 'large', location: 'Main Building' },
  { id: 'c1', name: 'C-01', type: 'cat', location: 'Cat Room' },
  { id: 'c2', name: 'C-02', type: 'cat', location: 'Cat Room' },
  { id: 'c3', name: 'C-03', type: 'cat', location: 'Cat Room' },
  { id: 'waitlist', name: 'Waitlist', type: 'waitlist', location: 'Waitlist' },
] as const;

export const mockReservations = [
  // Active reservations checking out today
  {
    id: '1',
    pet: mockPets[0], // Max
    startDate: format(subDays(today, 3), 'yyyy-MM-dd'),
    endDate: format(today, 'yyyy-MM-dd'),
    status: 'active',
    service: 'boarding',
    notes: 'Allergic to chicken',
    kennelId: 'k5',
    checkedInAt: format(subDays(today, 3), 'yyyy-MM-dd HH:mm:ss'),
    scheduledCheckOut: format(today, 'yyyy-MM-dd'),
    droppedItems: [
      {
        id: 'item-1',
        name: 'Food Container',
        description: 'Blue plastic container with dry food',
        quantity: 1,
        condition: 'New',
      },
      {
        id: 'item-2',
        name: 'Medication',
        description: 'Joint supplements - 2 week supply',
        quantity: 1,
        condition: 'Sealed',
      },
    ],
  },
  {
    id: '2',
    pet: mockPets[4], // Oliver
    startDate: format(subDays(today, 2), 'yyyy-MM-dd'),
    endDate: format(today, 'yyyy-MM-dd'),
    status: 'active',
    service: 'boarding',
    kennelId: 'c1',
    checkedInAt: format(subDays(today, 2), 'yyyy-MM-dd HH:mm:ss'),
    scheduledCheckOut: format(today, 'yyyy-MM-dd'),
    droppedItems: [
      {
        id: 'item-3',
        name: 'Cat Bed',
        description: 'Small plush bed',
        quantity: 1,
        condition: 'Used - Excellent',
      },
    ],
  },

  // Active reservations checking out tomorrow
  {
    id: '3',
    pet: mockPets[6], // Milo
    startDate: format(subDays(today, 4), 'yyyy-MM-dd'),
    endDate: format(addDays(today, 1), 'yyyy-MM-dd'),
    status: 'active',
    service: 'boarding',
    notes: 'Needs medication twice daily',
    kennelId: 'k3',
    checkedInAt: format(subDays(today, 4), 'yyyy-MM-dd HH:mm:ss'),
  },

  // Upcoming check-ins for today
  {
    id: '4',
    pet: mockPets[1], // Bella
    startDate: format(today, 'yyyy-MM-dd'),
    endDate: format(addDays(today, 3), 'yyyy-MM-dd'),
    status: 'upcoming',
    service: 'boarding',
    kennelId: 'k4',
  },
  {
    id: '5',
    pet: mockPets[9], // Simba
    startDate: format(today, 'yyyy-MM-dd'),
    endDate: format(addDays(today, 2), 'yyyy-MM-dd'),
    status: 'upcoming',
    service: 'boarding',
    kennelId: 'c2',
  },

  // Upcoming check-ins for tomorrow
  {
    id: '6',
    pet: mockPets[2], // Charlie
    startDate: format(addDays(today, 1), 'yyyy-MM-dd'),
    endDate: format(addDays(today, 4), 'yyyy-MM-dd'),
    status: 'upcoming',
    service: 'boarding',
    kennelId: 'c3',
  },

  // Future reservations
  {
    id: '7',
    pet: mockPets[7], // Milo
    startDate: format(addDays(today, 3), 'yyyy-MM-dd'),
    endDate: format(addDays(today, 7), 'yyyy-MM-dd'),
    status: 'upcoming',
    service: 'boarding',
    notes: 'Special diet required',
    kennelId: 'k6',
  },

  // Waitlist
  {
    id: '8',
    pet: mockPets[8], // Cooper
    startDate: format(today, 'yyyy-MM-dd'),
    endDate: format(addDays(today, 3), 'yyyy-MM-dd'),
    status: 'waitlist',
    service: 'boarding',
    notes: 'On waitlist - preferred kennel: K-03',
    kennelId: 'waitlist',
  },
] as const;

export const mockStats = {
  totalReservations: 45,
  activeReservations: 12,
  upcomingReservations: 8,
  monthlyRevenue: 3200,
} as const;
