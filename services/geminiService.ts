import { CartItem } from "../types";

export const generateOrderAnalysis = async (items: CartItem[]): Promise<string> => {
  // Simulate a short delay for better UX (feels like the system is processing the request)
  await new Promise(resolve => setTimeout(resolve, 600));

  return `尊敬的贵宾：

非常感谢您选择 **宁海县雅格莱顿家具有限公司 (Ninghai Accolade Furniture Ltd.)**。

我们非常荣幸能为您提供服务。您所甄选的家具系列，线条优雅，质感温润，完美诠释了简欧风格与现代生活的和谐交融。这不仅是一份购物清单，更是您非凡品味与生活哲学的体现。

在雅格家居，我们始终秉持对 **极致工艺** 的执着追求。每一处细节的打磨，每一寸材质的甄选，都凝聚着我们对美好居住空间的敬意。我们承诺，将以精湛的技艺，为您打造理想中的舒适居所。

期待与您的进一步合作，愿雅格家居常伴您左右。

顺颂商祺，

**宁海县雅格莱顿家具有限公司**`;
};