import { auth } from "@/auth";
import AddressCard from "@/app/(user)/account/components/address-card";
import OrderAccountProductCard from "@/app/(user)/account/components/order-product-card";
import SecurityItem from "@/app/(user)/account/components/security-item";
import SectionHeader from "@/components/page-sections/section-header";
import { AccountProductList, AddressList } from "@/util/data";
import { User } from "lucide-react";
import Image from "next/image";

const AccountPage = async () => {
  const session = await auth();

  const img = session?.user?.image;
  const name = session?.user?.name;
  const email = session?.user?.email;

  const securityNameList = ["Password", "Passkeys", "2 Step Verification"];
  return (
    <div id="section-container" className="px-16 pt-8">
      <section id="account" className="py-8">
        <SectionHeader name="Account" hasCTA ctaName="Edit" />
        <div id="account-section" className="pt-10 pb-4">
          <div
            id="account-section-container"
            className="flex h-fit w-full justify-between"
          >
            <div className="flex items-end w-full" id="account-section-c1">
              <div className="rounded-md inline-flex overflow-hidden ">
                {img ? (
                  <Image src={img} alt="" width={180} height={180} />
                ) : (
                  <User size={180} strokeWidth={1} />
                )}
              </div>
              <div className="pl-4">
                <span className="text-3xl font-bold">{name}</span>
                <div>
                  <span className="text-[14px] text-slate-600 font-medium">
                    Email:{" "}
                  </span>
                  <span className="font-medium">{email}</span>
                </div>
              </div>
            </div>
            <span className="w-[3px] bg-slate-300 self-stretch mx-8"></span>
            <div
              className="self-stretch px-5 py-3 flex flex-col gap-4 w-full "
              id="account-section-c2"
            >
              <div>Security</div>
              <div id="security-elements" className="grid grid-cols-2 gap-4">
                {securityNameList.map((item) => {
                  return <SecurityItem name={item} key={item} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="account" className="pt-4 pb-20">
        <SectionHeader name="Recent Orders" hasCTA ctaName="View All" />
        <div
          id="order-section-container"
          className="grid grid-cols-2 gap-3 mt-12"
        >
          {AccountProductList.map((item, index) => {
            // console.log(index);
            return <OrderAccountProductCard {...item} key={index} />;
          })}
        </div>
      </section>
      <section className="pt-4 pb-20">
        <SectionHeader name="Address" hasCTA={false} />
        <div
          id="address-container"
          className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4"
        >
          <AddressCard />
          {AddressList.map((item, index) => {
            return (
              <AddressCard address={item} recipientName={name} key={index} />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AccountPage;
