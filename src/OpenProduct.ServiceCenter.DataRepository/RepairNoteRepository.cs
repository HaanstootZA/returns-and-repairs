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

        public IEnumerable<RepairNote> GetMostRecent()
        {
            return new RepairNote[] {
                new RepairNote()
                {
                    Capturer = "Albert Spangler",
                    Id = "RPT001",
                    Lines = new RepairNoteLine[]
                    {
                        new RepairNoteLine
                        {
                            PartNumber = "GEN001",
                            Quantity = 20
                        }
                    }
                } };
        }
    }
}
