using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;

namespace OpenProduct.ServiceCenter.DataRepository.UnitTests
{
    [TestClass]
    public class RepairNoteRepositoryTests
    {
        [TestMethod]
        public void TestConstructor()
        {
            Assert.IsNotNull(new RepairNoteRepository(Mock.Of<ILogger<RepairNoteRepository>>()));
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void TestConstructorArgumentNullException()
        {
            Assert.IsNotNull(new RepairNoteRepository(null));
        }

        [TestMethod]
        public void TestGetMostRecent()
        {
            RepairNoteRepository testRepairNoteRepository = new RepairNoteRepository(Mock.Of<ILogger<RepairNoteRepository>>());
            Assert.IsNotNull(testRepairNoteRepository.GetMostRecent());
        }
    }
}
