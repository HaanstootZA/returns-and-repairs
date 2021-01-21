using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using OpenProduct.ServiceCenter.DataRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OpenProduct.ServiceCenter.Api.UnitTests
{
    [TestClass]
    public class StartupTests
    {
        [TestMethod]
        public void TestConstructor()
        {
            Assert.IsNotNull(new Startup(Mock.Of<IConfiguration>()));
        }

        [TestMethod]
        public void TestConstructorNull()
        {
            Assert.IsNotNull(new Startup(null));
        }

        [TestMethod]
        public void ConfigureServices()
        {
            ServiceCollection serviceCollection = new ServiceCollection();
            Startup testStartup = new Startup(Mock.Of<IConfiguration>());
            testStartup.ConfigureServices(serviceCollection);
            
            Assert.IsTrue(serviceCollection.Any(s => s.ServiceType == typeof(IRepairNoteRepository)));
        }
    }
}
