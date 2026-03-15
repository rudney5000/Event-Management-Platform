import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { getCallsToAction, getProducts } from '../model/constants';

export function ProductsPopover() {
  const { t } = useTranslation();
  const products = getProducts(t);
  const callsToAction = getCallsToAction(t);

  return (
    <Popover className="relative">
      <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-white hover:text-gray-300 transition-colors">
        {t('header.product')}
        <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-500" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
      >
        <div className="p-4">
          {products.map((item) => (
            <div key={item.name} className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-white/5">
              <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-700/50 group-hover:bg-gray-700">
                <item.icon aria-hidden="true" className="size-6 text-gray-400 group-hover:text-white" />
              </div>
              <div className="flex-auto">
                <NavLink to={item.href} className="block font-semibold text-white">
                  {item.name}
                  <span className="absolute inset-0" />
                </NavLink>
                <p className="mt-1 text-gray-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 divide-x divide-white/10 bg-gray-700/50">
          {callsToAction.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-white hover:bg-gray-700/50"
            >
              <item.icon aria-hidden="true" className="size-5 flex-none text-gray-500" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  );
}