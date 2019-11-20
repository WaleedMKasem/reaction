import mockContext from "@reactioncommerce/api-utils/tests/mockContext.js";
import ReactionError from "@reactioncommerce/reaction-error";
import createProduct from "./createProduct.js";

mockContext.mutations.createProduct = jest.fn().mockName("mutations.createProduct");

test("throws if permission check fails", async () => {
  mockContext.checkPermissions.mockImplementation(() => {
    throw new ReactionError("access-denied", "Access Denied");
  });

  await expect(createProduct(mockContext, {
    shopId: "SHOP_ID"
  })).rejects.toThrowErrorMatchingSnapshot();

  expect(mockContext.checkPermissions).toHaveBeenCalledWith(["createProduct", "product/admin", "product/create"], "SHOP_ID");
});

test("throws if the shopId isn't supplied", async () => {
  mockContext.checkPermissions.mockReturnValueOnce(Promise.resolve(null));

  await expect(createProduct(mockContext, {
    shopId: undefined
  })).rejects.toThrowErrorMatchingSnapshot();
});