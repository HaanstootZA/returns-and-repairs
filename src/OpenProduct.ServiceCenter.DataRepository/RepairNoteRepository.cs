using Microsoft.Extensions.Logging;
using OpenProduct.ServiceCenter.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace OpenProduct.ServiceCenter.DataRepository
{
    public class RepairNoteRepository : IRepairNoteRepository
    {
        private ILogger logger;

        public RepairNoteRepository(ILogger<RepairNoteRepository> logger)
        {
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public IEnumerable<RepairNote> GetRepairNotes()
        {
            return new List<RepairNote>() { new RepairNote() };
        }
    }
}
