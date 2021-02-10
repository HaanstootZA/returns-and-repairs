using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using OpenProduct.ServiceCenter.Core;
using System;
using System.Collections.Generic;
using System.Linq;

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
            IEnumerable<RepairNote> actualMostRecent = testRepairNoteRepository.GetMostRecent();
            Assert.IsNotNull(actualMostRecent);
            Assert.AreEqual(1, actualMostRecent.Count());
        }
    }
}
