"use client";

import {
  availableColors,
  availableSizes,
  productModalFormSchema,
} from "@/util/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import z from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  storesList,
  useStoreList,
} from "@/app/(seller)/dashboard/(root)/context/store-context";
import { Button } from "../ui/button";
import { Plus, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useModalStore } from "@/util/states/modal";

import { createProduct } from "@/actions/(seller)/product/product-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
//  NOTE: First step is done.

const Step_1 = ({ storeList }: { storeList: storesList }) => {
  // Get access to all form methods from the context
  const { setValue } = useFormContext();

  return (
    <div className="space-y-4 ">
      <FormField
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Name</FormLabel>
            <FormControl>
              <Input placeholder="eg. Allen Solly Shirt" {...field} />
            </FormControl>
            {/* <FormDescription></FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Describe the product" {...field} />
            </FormControl>
            {/* <FormDescription></FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                {/*  Here we will handle the status of the product part */}

                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archive">Archive</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        {/* Check if there any security threat if you expose your storeId as a key property*/}
        <FormField
          name="storeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stores</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Store" />
                  </SelectTrigger>
                  <SelectContent>
                    {storeList.map((item) => (
                      <div key={item.storeId}>
                        {item.isActive && (
                          <SelectItem value={item.storeId}>
                            {item.storeName}
                          </SelectItem>
                        )}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
              {/* <FormDescription></FormDescription> */}
            </FormItem>
          )}
        />
        <FormField
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    // Get the selected file
                    const file = e.target.files?.[0];
                    // Update the form value with the file
                    // RHF's `onChange` would normally be used, but for files,
                    // `setValue` is more explicit and reliable.
                    setValue("image", file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

//  TODO: 2nd step needed to work. Things i needed to do: 1. name, 2. color, 3. size, 4. price, 5. quantity
//  Now the question ariese that how the form will know that the name property is of the variant one not the product one??
//  Here we are going to manage a dynamic form, so we have to give our form the context of how to manage it

const Step_2 = () => {
  // Here we are giving our react the context to manage our form
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // Here we are going to create a array that will store dynamic data
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "variants",
    rules: { required: { value: true, message: "Add at least one variant" } },
  });

  return (
    <div className="space-y-4">
      {/* If there are any error then show it */}
      {errors && <FormMessage>{errors.root?.message}</FormMessage>}
      <div className="flex flex-col gap-4 pr-2">
        {fields.map((item, index) => (
          <Card key={item.id} className="bg-slate-50">
            <CardContent className="p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <FormLabel className="font-semibold">
                  Variant #{index + 1}
                </FormLabel>
                <Button
                  className="text-red-500 hover:text-red-700 hover:cursor-pointer"
                  onClick={() => remove(index)}
                  type="button"
                >
                  <TrashIcon />
                </Button>
              </div>

              <FormField
                name={`variants.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variant Name</FormLabel>
                    <FormControl>
                      {/* Why this input shows ts error without the placeholder */}
                      <Input placeholder="eg. Red, Small" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name={`variants.${index}.color`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        {/* Why this input shows ts error without the placeholder */}
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a available color" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableColors.map((item, index) => (
                              <div key={index}>
                                <SelectItem
                                  className="flex items-center justify-between"
                                  value={item.hex}
                                >
                                  {item.name}
                                </SelectItem>
                                <span
                                  className={`h-4 w-4 bg-[${item.hex}]`}
                                ></span>
                              </div>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name={`variants.${index}.size`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          {...field}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableSizes.map((item, index) => (
                              <SelectItem
                                key={index}
                                className="flex items-center justify-between"
                                value={item}
                              >
                                {item.toUpperCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-4">
                <FormField
                  name={`variants.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="price of the variant"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name={`variants.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="quantity of item"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        type="button"
        variant={"outline"}
        onClick={() =>
          append({ name: "", color: "", size: "", quantity: 0.0, price: 0.0 })
        }
        className="w-full"
      >
        Create Variant <Plus />
      </Button>
    </div>
  );
};

//  TODO: 3nd step needed to work.
//

const Step_3 = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const {
    fields: catFields,
    append: catAppend,
    remove: catRemove,
  } = useFieldArray({ control, name: "categories" });
  const {
    fields: tagFields,
    append: tagAppend,
    remove: tagRemove,
  } = useFieldArray({ control, name: "tags" });

  // const handleCategoryNameChange = (index: number, newName: string) => {
  //   const newSlug = `${slugify(newName)}-${nanoid(6)}`;
  //   setValue(`categories.${index}.name`, newName);
  //   setValue(`categories.${index}.slug`, newSlug);
  // };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-3">
        <h4>Categories</h4>
        {typeof errors.root?.type === "string" && (
          <FormMessage>{errors.root.message}</FormMessage>
        )}
        <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-2">
          {catFields.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2">
              <FormField
                name={`categories.${index}.name`}
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input placeholder="e.g. Apparel" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => catRemove(index)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => catAppend({ name: "" })}
          className="w-full"
        >
          + Add Category
        </Button>
      </div>
      <div className="space-y-3">
        <h4 className="font-semibold text-md">Tags (Optional)</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {tagFields.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2">
              <div className="flex-grow space-y-1">
                <FormField
                  name={`tags.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Tag Name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name={`tags.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Tag Description" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => tagRemove(index)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => tagAppend({ name: "", description: "" })}
          className="w-full"
        >
          + Add Tag
        </Button>
      </div>
    </div>
  );
};

type In = z.input<typeof productModalFormSchema>; // RHF values (strings from inputs)
export type Out = z.output<typeof productModalFormSchema>; // After zod transforms (numbers)

// TODO: I have added the form field to take image as input but i have not set the backend and db to store it. I have to work upon it.

const CreateProductModal = () => {
  const storeList = useStoreList();

  const { closeModal } = useModalStore();
  const [step, setStep] = useState(1);
  const form = useForm<In, unknown, Out>({
    resolver: zodResolver(productModalFormSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "draft",
      variants: [],
      categories: [],
      tags: [],
      image: undefined,
    },
  });
  const route = useRouter();

  const STEPS: {
    number: number;
    title: string;
    fields: (keyof Out)[];
  }[] = [
    {
      number: 1,
      title: "Product Information",
      fields: ["name", "description", "status", "storeId", "image"],
    },
    { number: 2, title: "Variants & Pricing", fields: ["variants"] },
    { number: 3, title: "Organization", fields: ["categories", "tags"] },
  ];

  const handleNext = async () => {
    const fields = STEPS[step - 1].fields;
    // console.log(step);
    const isStepValid = await form.trigger(fields);
    if (isStepValid && step < STEPS.length) {
      setStep(step + 1);
    } else {
      console.log("Step is not valid", isStepValid);
      console.log(form.watch());
      console.log(form.formState.errors);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleClose = () => {
    form.reset();
    setStep(1);
    closeModal();
  };

  const onSubmit = async (data: Out) => {
    console.log("Form Submitted:", data);
    // console.log(step);

    // NOTE: It is working only when the step 3 has atleast one none-optional point

    await createProduct(data);
    /*     console.log("The onSubmit button is clicked");
    console.log(form.formState); */

    toast.success("Product created successfully!", {
      description: "Your new Product is now ready for Sales.",
    });

    route.refresh();
    handleClose();
  };

  // If user don't have any store, first tell him to create a store
  if (storeList?.length === 0) {
    // toast("create a store first");
    return (
      <div className="px-6 py-2 flex items-center justify-between">
        You dont&apos; have a stoer yet. Close this and create a store first.
        <button
          type="button"
          onClick={handleClose}
          className="text-slate-300 hover:text-slate-600 text-2xl hover:cursor-pointer"
        >
          &times;
        </button>
      </div>
    );
  }

  return (
    <div>
      <Card className="py-2 px-4  border-0 outline-none ring-0 focus:ring-0 shadow-none">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="px-0 py-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 pb-3">
                    Step {step} of {STEPS.length}
                  </p>
                  <CardTitle>{STEPS[step - 1].title}</CardTitle>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-slate-300 hover:text-slate-600 text-2xl hover:cursor-pointer"
                >
                  &times;
                </button>
              </div>
            </CardHeader>
            <CardContent className="px-0">
              {step === 1 && storeList && <Step_1 storeList={storeList} />}
              {step === 2 && <Step_2 />}
              {step === 3 && <Step_3 />}
            </CardContent>
            <CardFooter className="justify-between pt-4 px-0">
              <Button
                disabled={step === 1}
                variant={"outline"}
                onClick={handleBack}
                type="button"
              >
                Back
              </Button>
              {step < STEPS.length ? (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit">Create Product</Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CreateProductModal;
