Feature: RepairNotes
	 As a service center employee to to support clients I need to interact with repair notes

@ViewRepairNotes
Scenario: Retrieve a list of existing repair notes
	Given A connection an API connectiong
	When I call the Repair Notes Controller GET function
	Then the API should return a list of existing repair notes