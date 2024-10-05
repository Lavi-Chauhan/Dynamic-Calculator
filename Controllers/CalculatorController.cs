using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DynamicCalculator.Controllers
{
    public class CalculatorController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
