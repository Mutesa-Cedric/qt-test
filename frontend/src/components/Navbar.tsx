import { Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import useAuth from '../hooks/useAuth'
import { showAddOrEditPostModalState } from '../store'



export default function Navbar() {

    const { user, logout, loggingOut } = useAuth();
    const [, setShowAddPost] = useRecoilState(showAddOrEditPostModalState);

    return (
        <>
            {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
            <Popover
                as="header"
                className="bg-white shadow-sm data-[open]:fixed data-[open]:inset-0 data-[open]:z-40 data-[open]:overflow-y-auto lg:static lg:overflow-y-visible data-[open]:lg:static data-[open]:lg:overflow-y-visible"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
                    <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                        <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                            <div className="flex flex-shrink-0 items-center">
                                <Link to="/">
                                    <img
                                        alt="Your Company"
                                        src="/logo.png"
                                        className="h-12"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">

                        </div>
                        <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                            {/* Mobile menu button */}
                            <PopoverButton className="group relative -mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                            </PopoverButton>
                        </div>
                        <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">


                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-5 flex-shrink-0">
                                <div className='mr-2'>

                                    <MenuButton className="relative flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        <div className='p-2 bg-gray-300 rounded-full'>
                                            {user?.name.slice(0, 2).toUpperCase()}
                                        </div>
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    // @ts-expect-error ( )
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <MenuItem>
                                        <Button
                                            onClick={logout}
                                            color='red'
                                            variant='outline'
                                            className='w-full'
                                        >
                                            Sign Out
                                        </Button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>

                            {user ?
                                <Button
                                    onClick={() => setShowAddPost({
                                        show: true,
                                        action: 'add'
                                    })}
                                >
                                    Create Post
                                </Button> :
                                <div className='space-x-4'>
                                    <Button
                                        component={Link}
                                        to="/register"
                                    >
                                        Register
                                    </Button>
                                    <Button
                                        component={Link}
                                        to="/login"
                                    >
                                        Login
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <PopoverPanel as="nav" aria-label="Global" className="lg:hidden">
                    <div className="border-t border-gray-200 pb-3 pt-4">
                        <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                            <div className="ml-3">
                                <div className="text-base font-medium text-gray-800">{user?.name}</div>
                                <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                            </div>
                        </div>
                        {user ? <div className="mx-auto mt-3 max-w-3xl space-x-2 px-2 sm:px-4">
                            <Button
                                onClick={() => setShowAddPost({
                                    show: true,
                                    action: 'add'
                                })}
                            >
                                Create Post
                            </Button>
                            <Button
                                variant='outline'
                                color='red'
                                onClick={logout}
                            >
                                Sign Out
                            </Button>
                        </div> : <div className="mx-auto mt-3 max-w-3xl space-x-3 px-2 sm:px-4">
                            <Button
                                component={Link}
                                to="/register"
                            >
                                Register
                            </Button>
                            <Button
                                component={Link}
                                to="/login"
                            >
                                Login
                            </Button>
                        </div>}
                    </div>
                </PopoverPanel>
            </Popover>
        </>
    )
}
