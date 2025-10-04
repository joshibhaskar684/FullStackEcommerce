'use client'

import { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { MdFilterList } from 'react-icons/md';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductCard from './ProductCard';
import { Homesectioncaroseldata } from '../../../Data/Homesectioncarsouledata'
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from '../../../State/Product/Action';
import { Pagination } from '@mui/material';

const sortOptions = [
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: false },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
       { value: 'Black', label: 'Black', checked: false },
        { value: 'Navy', label: 'Navy', checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: 'S', label: 'S', checked: false },
      { value: 'M', label: 'M', checked: false },
      { value: 'L', label: 'L', checked: false },
    ]
  },

]
const SingleFilter = [{
  id: "Price",
  name: "Price",
  options: [
    { value: "150-399", label: "150-399" },
    { value: "400-799", label: "400-799" },
    { value: "800-999", label: "800-999" },
    { value: "1000-1499", label: "1000-1499" }
  ]
}
  , {
  id: "discount",
  name: "Discount Range",
  options: [
    { value: "20", label: "20% And Above" },
    { value: "30", label: "30% And Above" },
    { value: "40", label: "40% And Above" },
    { value: "50", label: "50% And Above" },
    { value: "60", label: "60% And Above" },
    { value: "70", label: "70% And Above" },
    { value: "80", label: "80% And Above" },
    { value: "90", label: "90% And Above" },
  ]
}
  , {
  id: "stock",
  name: "Availability",
  options: [
    { value: "inStock", label: "In Stock" },
    { value: "outOfStock", label: "Out Of Stock" },
  ]
}
];
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  



  const location = useLocation();
const navigate = useNavigate();
const param = useParams();
const dispatch = useDispatch();

const searchParams = new URLSearchParams(decodeURIComponent(location.search));

const colorValue = searchParams.getAll("color");   // ✅ multiple values
const sizeValue = searchParams.getAll("size");     // ✅ multiple values
const priceValue = searchParams.get("price");      // e.g., "500-2000"
const discount = parseInt(searchParams.get("discount")) || 0;
const stock = searchParams.get("stock") || "in_stock";
const sortValue = searchParams.get("sort") || "price_low";
const pageNumber = parseInt(searchParams.get("page")) || 0;

useEffect(() => {
  const [minPrice, maxPrice] = priceValue
    ? priceValue.split("-").map(Number)
    : [0, 1000000];

  const data = {
    category: param.lavelThree,
    colors: colorValue||" ",
    sizes: sizeValue|" ",
    minPrice,
    maxPrice,
    minDiscount: discount||0,
    sort: sortValue||"price_low",
    pageNo: pageNumber||1,
    pageSize: 12,
    stock:stock,
  };

  dispatch(findProducts(data));
}, [
  location.search, param.lavelThree

]); // ✅ react to full search string

const handlePaginationChange=(event,page)=>{
  const searchParams = new URLSearchParams(location.search);
  searchParams.set("page", page);
  const query=searchParams.toString();
  navigate({ search: `?${query}` });
}
const {productStore}=useSelector(Store=>Store);
const product=productStore;

  const handlefilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    let filterValue = searchParams.getAll(sectionId).join(',').split(',').filter(Boolean);

    if (filterValue.includes(value)) {
      filterValue = filterValue.filter((item) => item !== value);
    } else {
      filterValue.push(value);
    }

    if (filterValue.length === 0) {
      searchParams.delete(sectionId);
    } else {
      searchParams.set(sectionId, filterValue.join(','));
    }

    navigate({ search: `?${searchParams.toString()}` });
  };

  const handleRadiofilterchange = (event, sectionId) => {
    const searchParams = new URLSearchParams(location.search);

    // Always replace the old value for this filter group
    searchParams.set(sectionId, event.target.value);

    navigate({ search: `?${searchParams.toString()}` });
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* mobilr Filters */}
              <form className="mt-4 border-t border-gray-200">


                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  onChange={() => handlefilter(option.value, section.id)}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
                {SingleFilter.map((section) => (

                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <FormLabel className="font-medium " sx={{ color: "black" }}>{section.name}</FormLabel>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue=""
                            name="radio-buttons-group"
                          >
                            {section.options.map((option, optionIdx) => (


                              <FormControlLabel onChange={(e) => handleRadiofilterchange(e, section.id)} key={optionIdx} value={option.value} control={<Radio />} label={option.label} sx={{ color: "gray" }} />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="sm:text-4xl font-bold tracking-tight text-gray-900 text-[19px]">New Arrivals</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                            'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden',
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              <div>

                <div className='py-10 flex justify-between items-center'>
                  <h1 className='text-lg opacity-50 font-bold'>
                    Filters
                  </h1>

                  <MdFilterList className='text-gray-500' size={24} />
                </div>
                {/*desktop Filters */}
                <form className="hidden lg:block">


                  {filters.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                            <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="grid size-4 grid-cols-1">
                                  <input
                                    value={option.value}
                                    defaultChecked={option.checked}
                                    onChange={() => handlefilter(option.value, section.id)}
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}`}
                                    type="checkbox"
                                    className="peer col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white 
               checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 
               focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center 
               stroke-white opacity-0 peer-checked:opacity-100"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>

                              </div>
                              <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                  {SingleFilter.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <FormLabel className="font-medium " sx={{ color: "black" }}>{section.name}</FormLabel>
                          <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                            <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          <FormControl>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"

                              name="radio-buttons-group"
                            >
                              {section.options.map((option, optionIdx) => (

                                <FormControlLabel onChange={(e) => handleRadiofilterchange(e, section.id)} key={optionIdx} value={option.value} control={<Radio />} name={section.id} label={option.label} sx={{ color: "gray" }} />
                              ))}

                            </RadioGroup>
                          </FormControl>
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}


                </form>
              </div>
              {/* Product grid */}
              <div className="lg:col-span-4 w-full col-span-2 ">

                <div className="flex flex-wrap justify-center  bg-white py-5 col-span-2">
                  
                
{
 product.products && product.products?.content?.map((product)=><ProductCard key={product.id} data={product}/>)

}



</div>


              </div>
            </div>
          </section>
          <section className='px=[3.6rem] w-full '>
            <div className='flex justify-center items-center px-4 py-5'>

<Pagination count={product.products?.totalPages} onChange={handlePaginationChange} color="secondary" />
            </div>
            
          </section>
        </main>
      </div>
    </div>
  )
}
