import HomeSearchPage from "./layouts/home/presentation/pages/home_serach_page";
import ResultPage from "./layouts/result/preseintistion/pages/result_page";
import SimilartyResultPage from "./layouts/similarty_result/presentition/pages/similarty_result_page";

export const companyManagerRoutes = [
  {
    route: "/",
    component: <HomeSearchPage />,
  },
  {
    route: "/result",
    component: <ResultPage />,
  },
  {
    route: "/similarty-result",
    component: <SimilartyResultPage />,
  },
];